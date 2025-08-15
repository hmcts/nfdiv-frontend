import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../../app/case/case';
import {
  CITIZEN_GENERAL_APPLICATION,
  GeneralApplication,
  GeneralApplicationType,
  GeneralParties,
  ListValue,
  OrderSummary,
  PaymentStatus,
  State,
  YesOrNo,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GENERAL_APPLICATION_PAYMENT_CALLBACK } from '../../../urls';

import GeneralApplicationPaymentPostController from './post';

jest.mock('../../../../app/payment/PaymentClient');

const { mockCreate, mockGet } = require('../../../../app/payment/PaymentClient');

describe('GeneralApplicationPaymentPostController', () => {
  const paymentController = new GeneralApplicationPaymentPostController();

  let mockReq: AppRequest;
  let applicant1GeneralApplicationServiceRequest: string;
  let applicant2GeneralApplicationServiceRequest: string;
  let applicant1GeneralApplicationFeeOrderSummary: OrderSummary;
  let applicant2GeneralApplicationFeeOrderSummary: OrderSummary;
  let applicant1GeneralApplications: ListValue<GeneralApplication>[];

  beforeEach(() => {
    mockCreate.mockClear();
    mockGet.mockClear();

    mockReq = mockRequest();

    applicant1GeneralApplicationServiceRequest = 'applicant1-service-request';
    applicant2GeneralApplicationServiceRequest = 'applicant2-service-request';
    applicant1GeneralApplicationFeeOrderSummary = {
      PaymentTotal: '100',
      PaymentReference: 'REF123',
      Fees: [],
    };
    applicant2GeneralApplicationFeeOrderSummary = {
      PaymentTotal: '200',
      PaymentReference: 'REF456',
      Fees: [],
    };
    applicant1GeneralApplications = [
      {
        id: '1',
        value: {
          generalApplicationType: GeneralApplicationType.ISSUE_DIVORCE_WITHOUT_CERT,
          generalParties: GeneralParties.APPLICANT,
          generalApplicationSubmittedOnline: YesOrNo.YES,
          generalApplicationFeeServiceRequestReference: applicant1GeneralApplicationServiceRequest,
        },
      },
    ];

    mockReq.session.userCase = {
      id: '1234',
      applicant1GeneralApplicationServiceRequest,
      applicant2GeneralApplicationServiceRequest,
      applicant1GeneralApplicationFeeOrderSummary,
      applicant2GeneralApplicationFeeOrderSummary,
      generalApplications: applicant1GeneralApplications,
    } as CaseWithId;
  });

  describe('payment', () => {
    it('creates a new payment and redirects to payment URL', async () => {
      mockReq.session.isApplicant2 = false;
      mockReq.session.userCase.state = State.AwaitingGeneralApplicationPayment;
      mockReq.session.userCase.applicant1GenApplicationPayments = [
        {
          id: 'timed out payment',
          value: {
            status: PaymentStatus.IN_PROGRESS,
            amount: 6000,
            feeCode: 'FEE',
            transactionId: 'mock transaction id',
            reference: 'ref',
            channel: 'channel',
          },
        },
      ];

      const res = mockResponse();

      (mockReq.locals.api.triggerPaymentEvent as jest.Mock).mockReturnValueOnce({
        applicant1GenApplicationPayments: [{ new: 'payment' }],
        applicant1GeneralApplicationFeeOrderSummary: {
          Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
        },
      });

      (mockCreate as jest.Mock).mockReturnValueOnce({
        date_created: '1999-12-31T23:59:59.999Z',
        reference: 'mock ref',
        external_reference: 'mock external reference payment id',
        _links: { next_url: { href: 'http://example.com/pay' } },
      });

      await paymentController.post(mockReq, res);
      expect(mockReq.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(GENERAL_APPLICATION_PAYMENT_CALLBACK);
    });

    it('transitions the case to awaiting general application payment if it is not ready for payment', async () => {
      mockReq.session.isApplicant2 = false;
      mockReq.session.userCase.state = State.AosOverdue;
      mockReq.session.userCase.applicant1GeneralApplicationServiceRequest = undefined;

      const res = mockResponse();

      (mockReq.locals.api.triggerEvent as jest.Mock).mockReturnValueOnce({
        state: State.AwaitingGeneralApplicationPayment,
        applicant1GeneralApplicationFeeOrderSummary: {
          Fees: [{ value: { FeeCode: 'mock fee code', FeeAmount: 123 } }],
        },
        applicant1GeneralApplicationServiceRequest: '/payment-callback',
      });

      (mockCreate as jest.Mock).mockReturnValueOnce({
        date_created: '1999-12-31T23:59:59.999Z',
        reference: 'mock ref',
        external_reference: 'mock external reference payment id',
        _links: { next_url: { href: 'http://example.com/pay' } },
      });

      await paymentController.post(mockReq, res);

      expect(mockReq.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_GENERAL_APPLICATION);
    });

    it('redirects to the callback page if last payment is in progress', async () => {
      mockReq.session.isApplicant2 = false;
      mockReq.session.userCase.state = State.AwaitingGeneralApplicationPayment;
      mockReq.session.userCase.applicant1GenApplicationPayments = [
        {
          id: 'mock external reference payment id',
          value: {
            amount: 123,
            channel: 'HMCTS Pay',
            feeCode: 'mock fee code',
            reference: 'mock ref',
            status: PaymentStatus.IN_PROGRESS,
            transactionId: 'mock external reference payment id',
          },
        },
      ];

      const res = mockResponse();

      await paymentController.post(mockReq, res);

      expect(mockCreate).not.toHaveBeenCalled();
      expect(mockReq.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(mockReq.locals.api.triggerPaymentEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(GENERAL_APPLICATION_PAYMENT_CALLBACK);
    });
  });
});
