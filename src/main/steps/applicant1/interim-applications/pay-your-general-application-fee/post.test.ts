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
  let applicant1GeneralAppServiceRequest: string;
  let applicant2GeneralAppServiceRequest: string;
  let applicant1GeneralAppOrderSummary: OrderSummary;
  let applicant1GeneralApplications: ListValue<GeneralApplication>[];

  beforeEach(() => {
    mockCreate.mockClear();
    mockGet.mockClear();

    mockReq = mockRequest();

    applicant1GeneralAppServiceRequest = 'applicant1-service-request';
    applicant2GeneralAppServiceRequest = 'applicant2-service-request';
    applicant1GeneralAppOrderSummary = {
      PaymentTotal: '100',
      PaymentReference: 'REF123',
      Fees: [
        {
          id: '1',
          value: {
            FeeCode: 'mock fee code',
            FeeAmount: '123',
            FeeDescription: 'fee',
            FeeVersion: '1',
          },
        },
      ],
    };
    applicant1GeneralApplications = [
      {
        id: '1',
        value: {
          generalApplicationType: GeneralApplicationType.ISSUE_DIVORCE_WITHOUT_CERT,
          generalApplicationParty: GeneralParties.APPLICANT,
          generalApplicationSubmittedOnline: YesOrNo.YES,
          generalApplicationFeeServiceRequestReference: applicant1GeneralAppServiceRequest,
          generalApplicationFeeOrderSummary: applicant1GeneralAppOrderSummary,
        },
      },
    ];

    mockReq.session.userCase = {
      id: '1234',
      applicant1GeneralAppServiceRequest,
      applicant2GeneralAppServiceRequest,
      generalApplications: applicant1GeneralApplications,
    } as CaseWithId;
  });

  describe('payment', () => {
    it('creates a new payment and redirects to payment URL', async () => {
      mockReq.session.isApplicant2 = false;
      mockReq.session.userCase.state = State.AwaitingGeneralApplicationPayment;
      mockReq.session.userCase.applicant1GeneralAppPayments = [
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
        applicant1GeneralAppPayments: [{ new: 'payment' }],
        applicant1GeneralAppOrderSummary: {
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
      mockReq.session.userCase.applicant1GeneralAppServiceRequest = undefined;

      const res = mockResponse();
      const serviceRequest = 'service-request';

      (mockReq.locals.api.triggerEvent as jest.Mock).mockReturnValueOnce({
        state: State.AwaitingGeneralApplicationPayment,
        applicant1GeneralAppServiceRequest: serviceRequest,
        generalApplications: [
          {
            id: '1',
            value: {
              generalApplicationType: GeneralApplicationType.ISSUE_DIVORCE_WITHOUT_CERT,
              generalApplicationParty: GeneralParties.APPLICANT,
              generalApplicationSubmittedOnline: YesOrNo.YES,
              generalApplicationFeeServiceRequestReference: serviceRequest,
              generalApplicationFeeOrderSummary: applicant1GeneralAppOrderSummary,
            },
          },
        ],
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
      mockReq.session.userCase.applicant1GeneralAppPayments = [
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
