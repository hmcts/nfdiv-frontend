import 'jest-extended';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CITIZEN_ADD_PAYMENT, PaymentStatus, State } from '../../app/case/definition';
import { APPLICATION_SUBMITTED, HOME_URL, PAY_YOUR_FEE } from '../../steps/urls';

import { PaymentCallbackGetController } from './get';

jest.mock('../../app/payment/PaymentClient');

const { mockCreate, mockGet } = require('../../app/payment/PaymentClient');

describe('PaymentCallbackGetController', () => {
  const paymentController = new PaymentCallbackGetController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockGet.mockClear();
  });

  describe('callback', () => {
    it('saves and redirects to the submitted page if last payment was successful', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingPayment,
          payments: [
            {
              id: 'mock payment id',
              value: {
                paymentAmount: 55000,
                paymentChannel: 'mock payment provider',
                paymentDate: '1999-12-31',
                paymentFeeId: 'FEE0002',
                paymentReference: 'mock ref',
                paymentSiteId: 'GOV Pay',
                paymentStatus: PaymentStatus.IN_PROGRESS,
                paymentTransactionId: 'mock payment id',
              },
            },
          ],
        },
      });
      const res = mockResponse();

      (mockGet as jest.Mock).mockReturnValueOnce({
        payment_id: 'mock payment id',
        status: 'Success',
      });

      await paymentController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith('mock ref');

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith({
        caseId: '1234',
        raw: {
          payments: [
            {
              id: 'mock payment id',
              value: {
                paymentAmount: 55000,
                paymentChannel: 'mock payment provider',
                paymentDate: '1999-12-31',
                paymentFeeId: 'FEE0002',
                paymentReference: 'mock ref',
                paymentSiteId: 'GOV Pay',
                paymentStatus: PaymentStatus.SUCCESS,
                paymentTransactionId: 'mock payment id',
              },
            },
          ],
        },
        eventName: CITIZEN_ADD_PAYMENT,
      });

      expect(res.redirect).toHaveBeenCalledWith(APPLICATION_SUBMITTED);
    });

    it('redirects to the home page if the state is not awaiting payment', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingDocuments,
        },
      });
      const res = mockResponse();

      await paymentController.get(req, res);

      expect(mockGet).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
    });

    it('redirects to the home page if there is no last payment', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingPayment,
        },
      });
      const res = mockResponse();

      await paymentController.get(req, res);

      expect(mockGet).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
    });

    it('saves and redirects to the pay your fee page if last payment was unsuccessful', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingPayment,
          payments: [
            {
              id: 'mock payment id',
              value: {
                paymentAmount: 55000,
                paymentChannel: 'mock payment provider',
                paymentDate: '1999-12-31',
                paymentFeeId: 'FEE0002',
                paymentReference: 'mock ref',
                paymentSiteId: 'GOV Pay',
                paymentStatus: PaymentStatus.IN_PROGRESS,
                paymentTransactionId: 'mock payment id',
              },
            },
          ],
        },
      });
      const res = mockResponse();

      (mockGet as jest.Mock).mockReturnValueOnce({
        payment_id: 'mock payment id',
        status: 'Failed',
      });

      await paymentController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith('mock ref');

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith({
        caseId: '1234',
        raw: {
          payments: [
            {
              id: 'mock payment id',
              value: {
                paymentAmount: 55000,
                paymentChannel: 'mock payment provider',
                paymentDate: '1999-12-31',
                paymentFeeId: 'FEE0002',
                paymentReference: 'mock ref',
                paymentSiteId: 'GOV Pay',
                paymentStatus: PaymentStatus.ERROR,
                paymentTransactionId: 'mock payment id',
              },
            },
          ],
        },
        eventName: CITIZEN_ADD_PAYMENT,
      });

      expect(res.redirect).toHaveBeenCalledWith(PAY_YOUR_FEE);
    });
  });
});
