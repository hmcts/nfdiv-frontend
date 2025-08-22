import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseWithId } from '../../../../app/case/case';
import {
  CITIZEN_GENERAL_APPLICATION_PAYMENT_MADE,
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
import { GENERAL_APPLICATION_SUBMITTED, HUB_PAGE, PAY_YOUR_GENERAL_APPLICATION_FEE } from '../../../urls';

import PaymentCallbackGetController from './get';

jest.mock('../../../../app/payment/PaymentClient');

const { mockCreate, mockGet } = require('../../../../app/payment/PaymentClient');

describe('PaymentCallbackGetController', () => {
  const paymentController = new PaymentCallbackGetController();

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
      Fees: [],
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

  describe('callback', () => {
    it('saves and redirects to the submitted page if last payment was successful', async () => {
      mockReq.session.userCase.state = State.AwaitingGeneralApplicationPayment;
      mockReq.session.userCase.applicant1GeneralAppPayments = [
        {
          id: 'mock payment id',
          value: {
            amount: 6000,
            channel: 'mock payment provider',
            feeCode: 'FEE0002',
            reference: 'mock ref',
            status: PaymentStatus.IN_PROGRESS,
            transactionId: 'mock payment id',
          },
        },
      ];

      mockReq.locals.api.triggerPaymentEvent = jest.fn().mockReturnValue(mockReq.session.userCase);
      const res = mockResponse();

      (mockGet as jest.Mock).mockReturnValueOnce({
        payment_id: 'mock payment id',
        status: 'Success',
      });

      await paymentController.get(mockReq, res);

      expect(mockGet).toHaveBeenCalledWith('mock ref');

      expect(mockReq.locals.api.triggerPaymentEvent).toHaveBeenCalledWith(
        '1234',
        { applicant1GeneralAppPayments: expect.any(Array) },
        CITIZEN_GENERAL_APPLICATION_PAYMENT_MADE
      );

      expect(res.redirect).toHaveBeenCalledWith(GENERAL_APPLICATION_SUBMITTED);
    });

    it('redirects to the hub page if the applicant has no outstanding general applications', async () => {
      mockReq.session.userCase.state = State.AwaitingGeneralApplicationPayment;
      mockReq.session.userCase.applicant1GeneralAppServiceRequest = undefined;

      const res = mockResponse();

      await paymentController.get(mockReq, res);

      expect(mockGet).not.toHaveBeenCalled();
      expect(mockReq.locals.api.triggerPaymentEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(HUB_PAGE);
    });

    it('redirects to the hub page if there have been no payment attempts', async () => {
      mockReq.session.userCase.state = State.AwaitingGeneralApplicationPayment;

      const res = mockResponse();

      await paymentController.get(mockReq, res);

      expect(mockGet).not.toHaveBeenCalled();
      expect(mockReq.locals.api.triggerPaymentEvent).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(HUB_PAGE);
    });

    it('saves and redirects to the pay your fee page if last payment was unsuccessful', async () => {
      mockReq.session.userCase.state = State.AwaitingGeneralApplicationPayment;
      mockReq.session.userCase.applicant1GeneralAppPayments = [
        {
          id: 'mock payment id',
          value: {
            amount: 6000,
            channel: 'mock payment provider',
            created: '1999-12-31T20:01:00.123',
            feeCode: 'FEE0002',
            reference: 'mock ref',
            status: PaymentStatus.IN_PROGRESS,
            transactionId: 'mock payment id',
          },
        },
      ];

      mockReq.locals.api.triggerPaymentEvent = jest.fn().mockReturnValue(mockReq.session.userCase);
      const res = mockResponse();

      (mockGet as jest.Mock).mockReturnValueOnce({
        payment_id: 'mock payment id',
        status: 'Failed',
      });

      await paymentController.get(mockReq, res);

      expect(mockGet).toHaveBeenCalledWith('mock ref');

      expect(mockReq.locals.api.triggerPaymentEvent).not.toHaveBeenCalled();

      expect(res.redirect).toHaveBeenCalledWith(PAY_YOUR_GENERAL_APPLICATION_FEE);
    });

    it('throws an error if the payment API is down', async () => {
      mockReq.session.userCase.state = State.AwaitingGeneralApplicationPayment;
      mockReq.session.userCase.applicant1GeneralAppPayments = [
        {
          id: 'mock payment id',
          value: {
            amount: 6000,
            channel: 'mock payment provider',
            created: '1999-12-31T20:01:00.123',
            feeCode: 'FEE0002',
            reference: 'mock ref',
            status: PaymentStatus.IN_PROGRESS,
            transactionId: 'mock payment id',
          },
        },
      ];

      mockReq.locals.api.triggerPaymentEvent = jest.fn().mockReturnValue(mockReq.session.userCase);
      const res = mockResponse();

      (mockGet as jest.Mock).mockReturnValueOnce(undefined);

      await expect(paymentController.get(mockReq, res)).rejects.toThrow(
        new Error('Could not retrieve payment status from payment service')
      );

      expect(mockGet).toHaveBeenCalledWith('mock ref');
    });
  });
});
