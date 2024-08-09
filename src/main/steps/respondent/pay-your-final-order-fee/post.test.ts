import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { PaymentStatus, RESPONDENT_APPLY_FOR_FINAL_ORDER, State } from '../../../app/case/definition';
import { PAYMENT_CALLBACK_URL, SAVE_AND_SIGN_OUT } from '../../urls';

import PaymentPostController from './post';

jest.mock('../../../app/payment/PaymentClient');

const { mockCreateServiceRequest, mockCreate, mockGet } = require('../../../app/payment/PaymentClient');

describe('PaymentPostController', () => {
  const paymentController = new PaymentPostController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockGet.mockClear();
    mockCreateServiceRequest.mockClear();
  });

  describe('payment', () => {
    it('creates a new payment and redirects to payment URL', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingRespondentFOPayment,
          applicationFeeOrderSummary: {
            Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
          },
          finalOrderPayments: [
            {
              id: 'timed out payment',
              value: {
                status: PaymentStatus.IN_PROGRESS,
                reference: 'ref',
              },
            },
          ],
        },
      });
      const res = mockResponse();

      (req.locals.api.triggerPaymentEvent as jest.Mock).mockReturnValueOnce({
        finalOrderPayments: [{ new: 'payment' }],
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
      expect(req.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/payment-callback');
    });

    it('transitions the case to awaiting payment if the state is awaiting final order', async () => {
      const req = mockRequest();
      const res = mockResponse();

      (req.locals.api.triggerEvent as jest.Mock).mockReturnValueOnce({
        state: State.AwaitingFinalOrder,
        applicant2FinalOrderFeeOrderSummary: {
          Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
        },
      });

      (mockCreate as jest.Mock).mockReturnValueOnce({
        date_created: '1999-12-31T23:59:59.999Z',
        reference: 'mock ref',
        external_reference: 'mock external reference payment id',
        _links: { next_url: { href: 'http://example.com/pay' } },
      });

      (mockCreateServiceRequest as jest.Mock).mockReturnValueOnce({
        service_request_reference: 'test1234',
      });

      await paymentController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, RESPONDENT_APPLY_FOR_FINAL_ORDER);
    });

    it('redirects to hub page if last payment is in progress', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingRespondentFOPayment,
          finalOrderPayments: [
            {
              id: 'mock external reference payment id',
              value: {
                amount: 123,
                channel: 'HMCTS Pay',
                create: '1999-12-31T20:00:01.123',
                feeCode: 'mock fee code',
                reference: 'mock ref',
                siteId: 'AA00',
                status: 'inProgress',
                transactionId: 'mock external reference payment id',
              },
            },
          ],
        },
      });
      const res = mockResponse();

      await paymentController.post(req, res);

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(req.locals.api.triggerPaymentEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(PAYMENT_CALLBACK_URL);
    });

    it('saves and signs out', async () => {
      const req = mockRequest();
      req.body['saveAndSignOut'] = true;
      const res = mockResponse();

      await paymentController.post(req, res);

      expect(res.redirect).toHaveBeenLastCalledWith(SAVE_AND_SIGN_OUT);
    });

    it('saves and signs out on timeout', async () => {
      const req = mockRequest();
      req.body['saveBeforeSessionTimeout'] = true;
      const res = mockResponse();

      await paymentController.post(req, res);

      expect(res.redirect).toHaveBeenLastCalledWith(SAVE_AND_SIGN_OUT);
    });
  });
});
