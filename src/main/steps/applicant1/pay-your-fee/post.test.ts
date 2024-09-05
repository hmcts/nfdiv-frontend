import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CITIZEN_SUBMIT, PaymentStatus, State } from '../../../app/case/definition';
import { PAYMENT_CALLBACK_URL, SAVE_AND_SIGN_OUT } from '../../urls';

import PaymentPostController from './post';

jest.mock('../../../app/payment/PaymentClient');

const {
  mockCreatePaymentWithNewServiceRequest,
  mockCreatePaymentForServiceRequest,
  mockGetCasePaymentGroups,
  mockGetPayment,
} = require('../../../app/payment/PaymentClient');

describe('PaymentPostController', () => {
  const paymentController = new PaymentPostController();

  beforeEach(() => {
    mockCreatePaymentForServiceRequest.mockClear();
    mockCreatePaymentWithNewServiceRequest.mockClear();
    mockGetCasePaymentGroups.mockClear();
    mockGetPayment.mockClear();
  });

  describe('Payment attempted for the first time', () => {
    it('takes payment with new service request', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingPayment,
          applicationFeeOrderSummary: {
            Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
          },
        },
      });
      const res = mockResponse();

      (req.locals.api.triggerPaymentEvent as jest.Mock).mockReturnValueOnce({
        applicationPayments: [{ new: 'payment' }],
        applicationFeeOrderSummary: {
          Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
        },
      });

      (mockGetCasePaymentGroups as jest.Mock).mockReturnValueOnce([]);

      const paymentRedirectUrl = 'http://example.com/pay';
      (mockCreatePaymentWithNewServiceRequest as jest.Mock).mockReturnValueOnce({
        date_created: '1999-12-31T23:59:59.999Z',
        reference: 'mock ref',
        external_reference: 'mock external reference payment id',
        _links: { next_url: { href: 'http://example.com/pay' } },
      });

      await paymentController.post(req, res);
      expect(req.session.save).toHaveBeenCalled();
      expect(mockCreatePaymentWithNewServiceRequest).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(paymentRedirectUrl);
    });

    it('redirects to payment callback if payment is already in progress', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingPayment,
          applicationFeeOrderSummary: {
            Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
          },
          applicationPayments: [
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

      await paymentController.post(req, res);
      expect(req.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(PAYMENT_CALLBACK_URL);
    });

    it('transitions the case to awaiting payment if the state is draft', async () => {
      const req = mockRequest();
      const res = mockResponse();

      (req.locals.api.triggerEvent as jest.Mock).mockReturnValueOnce({
        state: State.AwaitingPayment,
        applicationFeeOrderSummary: {
          Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
        },
      });

      (mockGetCasePaymentGroups as jest.Mock).mockReturnValueOnce([]);

      (mockCreatePaymentWithNewServiceRequest as jest.Mock).mockReturnValueOnce({
        date_created: '1999-12-31T23:59:59.999Z',
        reference: 'mock ref',
        external_reference: 'mock external reference payment id',
        _links: { next_url: { href: 'http://example.com/pay' } },
      });

      await paymentController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_SUBMIT);
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

  describe('Payment was attempted previously', () => {
    it('finds payment group and creates payment for the same service request', async () => {
      const applicationFeeOrderSummary = {
        Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
      };

      const req = mockRequest({
        userCase: {
          state: State.AwaitingPayment,
          applicationFeeOrderSummary,
          id: 'dummy',
          applicationPayments: [
            {
              id: 'timed out payment',
              value: {
                status: PaymentStatus.DECLINED,
                reference: 'ref',
              },
            },
          ],
        },
      });
      const res = mockResponse();

      const dummyFeeCode = 'mock fee code';
      const dummyServiceRef = 'previous-service-reference';
      (req.locals.api.triggerPaymentEvent as jest.Mock).mockReturnValueOnce({
        applicationPayments: [{ new: 'payment' }],
        applicationFeeOrderSummary,
      });

      const paymentGroupWithMatchingFee = {
        payment_group_reference: dummyServiceRef,
        fees: [{ code: dummyFeeCode }],
      };
      (mockGetCasePaymentGroups as jest.Mock).mockReturnValueOnce([paymentGroupWithMatchingFee]);

      const paymentRedirectUrl = 'http://example.com/pay';
      (mockCreatePaymentForServiceRequest as jest.Mock).mockReturnValueOnce({
        date_created: '1999-12-31T23:59:59.999Z',
        reference: 'mock ref',
        external_reference: 'mock external reference payment id',
        _links: { next_url: { href: paymentRedirectUrl } },
      });

      await paymentController.post(req, res);
      expect(req.session.save).toHaveBeenCalled();
      expect(mockCreatePaymentForServiceRequest).toHaveBeenCalledWith(dummyServiceRef, applicationFeeOrderSummary);
      expect(res.redirect).toHaveBeenCalledWith(paymentRedirectUrl);
    });
  });
});
