import 'jest-extended';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { PaymentStatus, State } from '../../app/case/definition';
import { CHECK_ANSWERS_URL, PAYMENT_CALLBACK_URL } from '../urls';

import PaymentPostController from './post';

jest.mock('../../app/payment/PaymentClient');

const { mockCreate, mockGet } = require('../../app/payment/PaymentClient');

describe('PaymentPostController', () => {
  const paymentController = new PaymentPostController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockGet.mockClear();
  });

  describe('payment', () => {
    it('creates a new payment and redirects to payment URL', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingPayment,
          applicationFeeOrderSummary: {
            Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
          },
          payments: [
            {
              id: 'timed out payment',
              value: {
                paymentStatus: PaymentStatus.IN_PROGRESS,
              },
            },
          ],
        },
      });
      const res = mockResponse();

      (req.locals.api.addPayment as jest.Mock).mockReturnValueOnce({
        payments: [{ new: 'payment' }],
        applicationFeeOrderSummary: {
          Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
        },
      });

      (mockCreate as jest.Mock).mockReturnValueOnce({
        date_created: '1999-12-31T23:59:59.999Z',
        reference: 'mock ref',
        external_reference: 'mock external reference payment id',
        _links: { next_url: { href: 'http://example.com/pay' } },
      });

      await paymentController.post(req, res);

      expect(mockCreate).toHaveBeenCalled();

      expect(req.locals.api.addPayment).toHaveBeenCalledWith('1234', [
        {
          id: 'timed out payment',
          value: {
            paymentStatus: PaymentStatus.TIMED_OUT,
          },
        },
        {
          id: 'mock external reference payment id',
          value: {
            paymentAmount: 123,
            paymentChannel: 'http://example.com/pay',
            paymentDate: '1999-12-31',
            paymentFeeId: 'mock fee code',
            paymentReference: 'mock ref',
            paymentSiteId: 'AA00',
            paymentStatus: PaymentStatus.IN_PROGRESS,
            paymentTransactionId: 'mock external reference payment id',
          },
        },
      ]);

      expect(req.session.userCase.payments).toEqual([{ new: 'payment' }]);

      expect(req.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('http://example.com/pay');
    });

    it('redirects to the check your answers page if the state is not draft', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingDocuments,
        },
      });
      const res = mockResponse();

      await paymentController.post(req, res);

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(CHECK_ANSWERS_URL);
    });

    it('redirects to the check your answers page if last payment is in progress', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingPayment,
          payments: [
            {
              id: 'mock external reference payment id',
              value: {
                paymentAmount: 123,
                paymentChannel: 'HMCTS Pay',
                paymentDate: '1999-12-31',
                paymentFeeId: 'mock fee code',
                paymentReference: 'mock ref',
                paymentSiteId: 'AA00',
                paymentStatus: 'inProgress',
                paymentTransactionId: 'mock external reference payment id',
              },
            },
          ],
        },
      });
      const res = mockResponse();

      await paymentController.post(req, res);

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(PAYMENT_CALLBACK_URL);
    });
  });
});
