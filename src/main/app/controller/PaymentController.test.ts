import 'jest-extended';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { APPLICATION_SUBMITTED, HOME_URL, PAY_YOUR_FEE } from '../../steps/urls';
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

      (req.locals.api.triggerEvent as jest.Mock).mockReturnValueOnce({
        payments: [{ existing: 'payment' }],
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

      await paymentController.payment(req, res);

      expect(mockCreate).toHaveBeenCalled();

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith({ caseId: '1234', eventName: CITIZEN_SUBMIT });

      expect(req.session.userCase.payments).toEqual([
        { existing: 'payment' },
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
      ]);

      expect(req.session.save).toHaveBeenCalled();
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

      await paymentController.callback(req, res);

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

      await paymentController.callback(req, res);

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
