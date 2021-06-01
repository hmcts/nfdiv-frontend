import 'jest-extended';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { APPLICATION_SUBMITTED, HOME_URL } from '../../steps/urls';
import { CITIZEN_ADD_PAYMENT, CITIZEN_SUBMIT, PaymentStatus, State } from '../case/definition';

import { PaymentController } from './PaymentController';

jest.mock('../payment/PaymentClient');

const { mockCreate, mockGet } = require('../payment/PaymentClient');

describe('PaymentController', () => {
  const paymentController = new PaymentController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockGet.mockClear();
  });

  describe('payment', () => {
    it('creates a new payment and redirects to payment URL', async () => {
      const req = mockRequest({
        userCase: {
          state: State.Draft,
        },
      });
      const res = mockResponse();

      (mockCreate as jest.Mock).mockReturnValueOnce({
        created_date: '1999-12-31T23:59:59.999Z',
        payment_provider: 'mock payment provider',
        reference: 'mock ref',
        payment_id: 'mock payment id',
        _links: { next_url: { href: 'http://example.com/pay' } },
      });

      await paymentController.payment(req, res);

      expect(mockCreate).toHaveBeenCalled();

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
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
        CITIZEN_SUBMIT
      );

      expect(res.redirect).toHaveBeenCalledWith('http://example.com/pay');
    });

    it('redirects to the home page if the state is not draft', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingDocuments,
        },
      });
      const res = mockResponse();

      await paymentController.payment(req, res);

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
    });

    it("throws an error if we don't get a payment redirect URL", async () => {
      const req = mockRequest({
        userCase: {
          state: State.Draft,
        },
      });
      const res = mockResponse();

      (mockCreate as jest.Mock).mockReturnValueOnce({});

      await expect(paymentController.payment(req, res)).rejects.toThrow('Failed to create new payment');
    });
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
        state: { status: 'success' },
      });

      await paymentController.callback(req, res);

      expect(mockGet).toHaveBeenCalledWith('mock payment id');

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
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
        CITIZEN_ADD_PAYMENT
      );

      expect(res.redirect).toHaveBeenCalledWith(APPLICATION_SUBMITTED);
    });

    it('redirects to the home page if the state is not awaiting payment', async () => {
      const req = mockRequest({
        userCase: {
          state: State.AwaitingDocuments,
        },
      });
      const res = mockResponse();

      await paymentController.callback(req, res);

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

      await paymentController.callback(req, res);

      expect(mockGet).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
    });

    it("redirects to payment URL if there's a payment in progress", async () => {
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
        state: { status: 'started' },
        _links: { next_url: { href: 'http://example.com/pay' } },
      });

      await paymentController.callback(req, res);

      expect(mockGet).toHaveBeenCalledWith('mock payment id');
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('http://example.com/pay');
    });

    it('saves and redirects to the home page if last payment was unsuccessful', async () => {
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
        state: { status: 'failed', code: 'P0030' },
      });

      await paymentController.callback(req, res);

      expect(mockGet).toHaveBeenCalledWith('mock payment id');

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
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
                paymentStatus: PaymentStatus.CANCELLED,
                paymentTransactionId: 'mock payment id',
              },
            },
          ],
        },
        CITIZEN_ADD_PAYMENT
      );

      expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
    });
  });
});
