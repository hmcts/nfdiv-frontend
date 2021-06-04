import 'jest-extended';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CITIZEN_SUBMIT, State } from '../../app/case/definition';
import { HOME_URL } from '../../steps/urls';

import { PaymentGetController } from './get';

jest.mock('../../app/payment/PaymentClient');

const { mockCreate, mockGet } = require('../../app/payment/PaymentClient');

describe('PaymentGetController', () => {
  const paymentController = new PaymentGetController();

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

      await paymentController.get(req, res);

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

      await paymentController.get(req, res);

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
    });
  });
});
