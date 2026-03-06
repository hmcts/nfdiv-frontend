import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { CaseWithId } from '../case/case';
import { GeneralApplication, GeneralApplicationType, GeneralParties, ListValue, YesOrNo } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';

import {
  findAllOnlineGenAppsForUser,
  findGenAppAwaitingPayment,
  getGenAppFeeOrderSummary,
  getGenAppPaymentsField,
  getGenAppServiceRequest,
} from './general-application-utils';

describe('GeneralApplicationUtils', () => {
  let mockReq: AppRequest;
  let applicant1GeneralAppServiceRequest: string;
  let applicant2GeneralAppServiceRequest: string;
  let applicant1GeneralApplications: ListValue<GeneralApplication>[];
  let applicant2GeneralApplications: ListValue<GeneralApplication>[];

  beforeEach(() => {
    mockReq = mockRequest();
    applicant1GeneralAppServiceRequest = 'applicant1-service-request';
    applicant2GeneralAppServiceRequest = 'applicant2-service-request';
    applicant1GeneralApplications = [
      {
        id: 'applicant1-genapp-1',
        value: {
          generalApplicationType: GeneralApplicationType.ISSUE_DIVORCE_WITHOUT_CERT,
          generalApplicationParty: GeneralParties.APPLICANT,
          generalApplicationSubmittedOnline: YesOrNo.YES,
          generalApplicationFeeServiceRequestReference: applicant1GeneralAppServiceRequest,
          generalApplicationFeeHasCompletedOnlinePayment: YesOrNo.NO,
          generalApplicationFeeOrderSummary: {
            PaymentTotal: '100',
            PaymentReference: 'REF123',
            Fees: [],
          },
        },
      },
      {
        id: 'applicant1-genapp-2',
        value: {
          generalApplicationType: GeneralApplicationType.ISSUE_DIVORCE_WITHOUT_CERT,
          generalApplicationParty: GeneralParties.APPLICANT,
          generalApplicationSubmittedOnline: YesOrNo.NO,
        },
      },
    ];
    applicant2GeneralApplications = [
      {
        id: 'applicant2-genapp-1',
        value: {
          generalApplicationType: GeneralApplicationType.EXPEDITE,
          generalApplicationParty: GeneralParties.RESPONDENT,
          generalApplicationSubmittedOnline: YesOrNo.YES,
          generalApplicationFeeServiceRequestReference: applicant2GeneralAppServiceRequest,
          generalApplicationFeeHasCompletedOnlinePayment: YesOrNo.NO,
          generalApplicationFeeOrderSummary: {
            PaymentTotal: '200',
            PaymentReference: 'REF456',
            Fees: [],
          },
        },
      },
    ];

    mockReq.session.userCase = {
      id: '1234',
      applicant1GeneralAppServiceRequest,
      applicant2GeneralAppServiceRequest,
      generalApplications: [...applicant1GeneralApplications, ...applicant2GeneralApplications],
    } as CaseWithId;
  });

  describe('GeneralAppServiceRequest', () => {
    test('Should return applicant 1 service request if logged in as applicant 1', () => {
      mockReq.session.isApplicant2 = false;

      expect(getGenAppServiceRequest(mockReq.session.userCase, mockReq.session.isApplicant2)).toEqual(
        applicant1GeneralAppServiceRequest
      );
    });

    test('Should return applicant 2 service request if logged in as applicant 2', () => {
      mockReq.session.isApplicant2 = true;

      expect(getGenAppServiceRequest(mockReq.session.userCase, mockReq.session.isApplicant2)).toEqual(
        applicant2GeneralAppServiceRequest
      );
    });
  });

  describe('GeneralAppOrderSummary', () => {
    test('Should return applicant 1 order summary if logged in as applicant 1', () => {
      mockReq.session.isApplicant2 = false;

      expect(getGenAppFeeOrderSummary(mockReq)).toEqual(
        applicant1GeneralApplications[0].value.generalApplicationFeeOrderSummary
      );
    });

    test('Should return applicant 2 order summary if logged in as applicant 2', () => {
      mockReq.session.isApplicant2 = true;

      expect(getGenAppFeeOrderSummary(mockReq)).toEqual(
        applicant2GeneralApplications[0].value.generalApplicationFeeOrderSummary
      );
    });
  });

  describe('getGenAppPaymentsField', () => {
    test('Should return applicant 1 payments field if logged in as applicant 1', () => {
      mockReq.session.isApplicant2 = false;

      expect(getGenAppPaymentsField(mockReq)).toEqual('applicant1GeneralAppPayments');
    });

    test('Should return applicant 2 payments field if logged in as applicant 2', () => {
      mockReq.session.isApplicant2 = true;

      expect(getGenAppPaymentsField(mockReq)).toEqual('applicant2GeneralAppPayments');
    });
  });

  describe('findAllOnlineGenAppsForUser', () => {
    test('Should return applicant 1 general applications if logged in as applicant 1', () => {
      expect(findAllOnlineGenAppsForUser(mockReq.session.userCase, false)).toEqual([
        applicant1GeneralApplications[0].value,
      ]);
    });

    test('Should return applicant 2 general applications if logged in as applicant 2', () => {
      mockReq.session.isApplicant2 = true;

      expect(findAllOnlineGenAppsForUser(mockReq.session.userCase, true)).toEqual(
        applicant2GeneralApplications.map(app => app.value)
      );
    });

    test('Should handle undefined general applications', () => {
      mockReq.session.userCase.generalApplications = undefined;

      expect(findAllOnlineGenAppsForUser(mockReq.session.userCase, false)).toEqual(undefined);
    });

    test('Should handle empty  general applications', () => {
      mockReq.session.userCase.generalApplications = [];

      expect(findAllOnlineGenAppsForUser(mockReq.session.userCase, false)).toEqual([]);
    });
  });

  describe('hasUnpaidGeneralApplication', () => {
    test('Should return general application if the party has an unpaid general application', () => {
      expect(findGenAppAwaitingPayment(mockReq.session.userCase, applicant1GeneralAppServiceRequest)).toEqual(
        applicant1GeneralApplications[0].value
      );
    });

    test('Should return undefined if no general applications match the service request', () => {
      expect(findGenAppAwaitingPayment(mockReq.session.userCase, 'dummmy-service-ref')).toEqual(undefined);
    });

    test('Should return undefined if the general applications are all paid', () => {
      mockReq.session.isApplicant2 = true;
      mockReq.session.userCase.generalApplications = [
        {
          id: 'applicant1-genapp-2',
          value: {
            generalApplicationType: GeneralApplicationType.ISSUE_DIVORCE_WITHOUT_CERT,
            generalApplicationParty: GeneralParties.APPLICANT,
            generalApplicationFeePaymentReference: 'paid',
            generalApplicationSubmittedOnline: YesOrNo.NO,
            generalApplicationFeeHasCompletedOnlinePayment: YesOrNo.YES,
          },
        },
      ];

      expect(findGenAppAwaitingPayment(mockReq.session.userCase, applicant2GeneralAppServiceRequest)).toEqual(
        undefined
      );
    });

    test('Should return undefined if the general applications are undefined', () => {
      mockReq.session.userCase.generalApplications = undefined;

      expect(findGenAppAwaitingPayment(mockReq.session.userCase, applicant2GeneralAppServiceRequest)).toEqual(
        undefined
      );
    });

    test('Should return undefined if the general applications are blank', () => {
      mockReq.session.userCase.generalApplications = [];

      expect(findGenAppAwaitingPayment(mockReq.session.userCase, applicant2GeneralAppServiceRequest)).toEqual(
        undefined
      );
    });
  });
});
