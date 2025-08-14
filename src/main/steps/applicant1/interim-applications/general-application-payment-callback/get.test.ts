import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import {
  ApplicationType,
  CITIZEN_GENERAL_APPLICATION_PAYMENT_MADE,
  PaymentStatus,
  State,
} from '../../../../app/case/definition';
import { GENERAL_APPLICATION_SUBMITTED, HUB_PAGE, PAY_YOUR_GENERAL_APPLICATION_FEE } from '../../../urls';

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
        state: State.AwaitingGeneralApplicationPayment,
        applicationType: ApplicationType.SOLE_APPLICATION,
        applicant1GeneralApplicationServiceRequest: 'service-request',
        applicant1GenApplicationPayments: [
          {
            id: 'mock payment id',
            value: {
              amount: 6000,
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
        { applicant1GenApplicationPayments: expect.any(Array) },
        CITIZEN_GENERAL_APPLICATION_PAYMENT_MADE
      );

      expect(res.redirect).toHaveBeenCalledWith(GENERAL_APPLICATION_SUBMITTED);
    });

    it('redirects to the hub page if the applicant has no outstanding general application service request', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingGeneralApplicationPayment,
          applicant1GeneralApplicationServiceRequest: null,
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
          state: State.AwaitingGeneralApplicationPayment,
          applicant1GeneralApplicationServiceRequest: 'service-request',
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
        state: State.AwaitingGeneralApplicationPayment,
        applicationType: ApplicationType.SOLE_APPLICATION,
        applicant1GeneralApplicationServiceRequest: 'service-request',
        applicant1GenApplicationPayments: [
          {
            id: 'mock payment id',
            value: {
              amount: 6000,
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

      expect(res.redirect).toHaveBeenCalledWith(PAY_YOUR_GENERAL_APPLICATION_FEE);
    });

    it('throws an error if the payment API is down', async () => {
      const userCase = {
        state: State.AwaitingGeneralApplicationPayment,
        applicationType: ApplicationType.SOLE_APPLICATION,
        applicant1GeneralApplicationServiceRequest: 'service-request',
        applicant1GenApplicationPayments: [
          {
            id: 'mock payment id',
            value: {
              amount: 6000,
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
