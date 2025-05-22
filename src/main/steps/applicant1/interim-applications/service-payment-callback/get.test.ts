import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { ApplicationType, CITIZEN_SERVICE_PAYMENT_MADE, PaymentStatus, State } from '../../../../app/case/definition';
import { HUB_PAGE, PAY_YOUR_SERVICE_FEE, SERVICE_APPLICATION_SUBMITTED } from '../../../urls';

import PaymentCallbackGetController from './get';

jest.mock('../../../../app/payment/PaymentClient');

const { mockCreate, mockGet } = require('../../../../app/payment/PaymentClient');

describe('PaymentCallbackGetController', () => {
  const paymentController = new PaymentCallbackGetController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockGet.mockClear();
  });

  describe('callback', () => {
    it('saves and redirects to the submitted page if last payment was successful', async () => {
      const userCase = {
        state: State.AwaitingServicePayment,
        applicationType: ApplicationType.SOLE_APPLICATION,
        servicePayments: [
          {
            id: 'mock payment id',
            value: {
              amount: 55000,
              channel: 'mock payment provider',
              feeCode: 'FEE0002',
              reference: 'mock ref',
              status: PaymentStatus.IN_PROGRESS,
              transactionId: 'mock payment id',
            },
          },
        ],
      };
      const req = mockRequest({
        userCase,
      });
      req.locals.api.triggerPaymentEvent = jest.fn().mockReturnValue(userCase);
      const res = mockResponse();

      (mockGet as jest.Mock).mockReturnValueOnce({
        payment_id: 'mock payment id',
        status: 'Success',
      });

      await paymentController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith('mock ref');

      expect(req.locals.api.triggerPaymentEvent).toHaveBeenCalledWith(
        '1234',
        { servicePayments: expect.any(Array) },
        CITIZEN_SERVICE_PAYMENT_MADE
      );

      expect(res.redirect).toHaveBeenCalledWith(SERVICE_APPLICATION_SUBMITTED);
    });

    it('redirects to the hub page if the state is not awaiting payment', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingServiceConsideration,
        },
      });
      const res = mockResponse();

      await paymentController.get(req, res);

      expect(mockGet).not.toHaveBeenCalled();
      expect(req.locals.api.triggerPaymentEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(HUB_PAGE);
    });

    it('redirects to the hub page if there have been no payment attempts', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingServicePayment,
        },
      });
      const res = mockResponse();

      await paymentController.get(req, res);

      expect(mockGet).not.toHaveBeenCalled();
      expect(req.locals.api.triggerPaymentEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(HUB_PAGE);
    });

    it('saves and redirects to the pay your fee page if last payment was unsuccessful', async () => {
      const userCase = {
        state: State.AwaitingServicePayment,
        applicationType: ApplicationType.SOLE_APPLICATION,
        servicePayments: [
          {
            id: 'mock payment id',
            value: {
              amount: 55000,
              channel: 'mock payment provider',
              created: '1999-12-31T20:01:00.123',
              feeCode: 'FEE0002',
              reference: 'mock ref',
              status: PaymentStatus.IN_PROGRESS,
              transactionId: 'mock payment id',
            },
          },
        ],
      };
      const req = mockRequest({
        userCase,
      });
      req.locals.api.triggerPaymentEvent = jest.fn().mockReturnValue(userCase);
      const res = mockResponse();

      (mockGet as jest.Mock).mockReturnValueOnce({
        payment_id: 'mock payment id',
        status: 'Failed',
      });

      await paymentController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith('mock ref');

      expect(req.locals.api.triggerPaymentEvent).not.toHaveBeenCalled();

      expect(res.redirect).toHaveBeenCalledWith(PAY_YOUR_SERVICE_FEE);
    });

    it('throws an error if the payment API is down', async () => {
      const userCase = {
        state: State.AwaitingServicePayment,
        applicationType: ApplicationType.SOLE_APPLICATION,
        servicePayments: [
          {
            id: 'mock payment id',
            value: {
              amount: 55000,
              channel: 'mock payment provider',
              created: '1999-12-31T20:01:00.123',
              feeCode: 'FEE0002',
              reference: 'mock ref',
              status: PaymentStatus.IN_PROGRESS,
              transactionId: 'mock payment id',
            },
          },
        ],
      };
      const req = mockRequest({
        userCase,
      });
      req.locals.api.triggerPaymentEvent = jest.fn().mockReturnValue(userCase);
      const res = mockResponse();

      (mockGet as jest.Mock).mockReturnValueOnce(undefined);

      await expect(paymentController.get(req, res)).rejects.toThrow(
        new Error('Could not retrieve payment status from payment service')
      );

      expect(mockGet).toHaveBeenCalledWith('mock ref');
    });
  });
});
