import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CITIZEN_SERVICE_APPLICATION, PaymentStatus, State } from '../../../../../app/case/definition';
import { SERVICE_PAYMENT_CALLBACK } from '../../../../urls';

import ServicePaymentPostController from './post';

jest.mock('../../../../../app/payment/PaymentClient');

const { mockCreate, mockGet } = require('../../../../../app/payment/PaymentClient');

describe('ServicePaymentPostController', () => {
  const paymentController = new ServicePaymentPostController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockGet.mockClear();
  });

  describe('payment', () => {
    it('creates a new payment and redirects to payment URL', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingServicePayment,
          servicePaymentFeeServiceRequestReference: '/service-payment-callback',
          servicePaymentFeeOrderSummary: {
            Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
          },
          servicePayments: [
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
        servicePayments: [{ new: 'payment' }],
        servicePaymentFeeOrderSummary: {
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
      expect(res.redirect).toHaveBeenCalledWith(SERVICE_PAYMENT_CALLBACK);
    });

    it('transitions the case to awaiting payment if the state is draft', async () => {
      const req = mockRequest();
      const res = mockResponse();

      (req.locals.api.triggerEvent as jest.Mock).mockReturnValueOnce({
        state: State.AwaitingServicePayment,
        servicePaymentFeeOrderSummary: {
          Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
        },
        servicePaymentFeeServiceRequestReference: '/service-payment-callback',
      });

      (mockCreate as jest.Mock).mockReturnValueOnce({
        date_created: '1999-12-31T23:59:59.999Z',
        reference: 'mock ref',
        external_reference: 'mock external reference payment id',
        _links: { next_url: { href: 'http://example.com/pay' } },
      });

      await paymentController.post(req, res);

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_SERVICE_APPLICATION);
    });

    it('redirects to the check your answers page if last payment is in progress', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingServicePayment,
          servicePaymentFeeServiceRequestReference: '/service-payment-callback',
          servicePayments: [
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
      expect(res.redirect).toHaveBeenCalledWith(SERVICE_PAYMENT_CALLBACK);
    });
  });
});
