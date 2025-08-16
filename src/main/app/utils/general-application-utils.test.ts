import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { CaseWithId } from '../case/case';
import {
  GeneralApplication,
  GeneralApplicationType,
  GeneralParties,
  ListValue,
  OrderSummary,
  YesOrNo,
} from '../case/definition';
import { AppRequest } from '../controller/AppRequest';

import {
  findOnlineGeneralApplicationsForUser,
  GeneralAppOrderSummary,
  generalApplicationPaymentsField,
  GeneralAppServiceRequest,
  hasUnpaidGeneralApplication,
} from './general-application-utils';

describe('GeneralApplicationUtils', () => {
  let mockReq: AppRequest;
  let applicant1GeneralAppServiceRequest: string;
  let applicant2GeneralAppServiceRequest: string;
  let applicant1GeneralAppOrderSummary: OrderSummary;
  let applicant2GeneralAppOrderSummary: OrderSummary;
  let applicant1GeneralApplications: ListValue<GeneralApplication>[];
  let applicant2GeneralApplications: ListValue<GeneralApplication>[];

  beforeEach(() => {
    mockReq = mockRequest();
    applicant1GeneralAppServiceRequest = 'applicant1-service-request';
    applicant2GeneralAppServiceRequest = 'applicant2-service-request';
    applicant1GeneralAppOrderSummary = {
      PaymentTotal: '100',
      PaymentReference: 'REF123',
      Fees: [],
    };
    applicant2GeneralAppOrderSummary = {
      PaymentTotal: '200',
      PaymentReference: 'REF456',
      Fees: [],
    };
    applicant1GeneralApplications = [
      {
        id: 'applicant1-genapp-1',
        value: {
          generalApplicationType: GeneralApplicationType.ISSUE_DIVORCE_WITHOUT_CERT,
          generalApplicationParty: GeneralParties.APPLICANT,
          generalApplicationSubmittedOnline: YesOrNo.YES,
          generalApplicationFeeServiceRequestReference: applicant1GeneralAppServiceRequest,
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
          generalApplicationFeePaymentReference: 'REF456',
        },
      },
    ];

    mockReq.session.userCase = {
      id: '1234',
      applicant1GeneralAppServiceRequest,
      applicant2GeneralAppServiceRequest,
      applicant1GeneralAppOrderSummary,
      applicant2GeneralAppOrderSummary,
      generalApplications: [...applicant1GeneralApplications, ...applicant2GeneralApplications],
    } as CaseWithId;
  });

  describe('GeneralAppServiceRequest', () => {
    test('Should return applicant 1 service request if logged in as applicant 1', () => {
      mockReq.session.isApplicant2 = false;

      expect(GeneralAppServiceRequest(mockReq)).toEqual(applicant1GeneralAppServiceRequest);
    });

    test('Should return applicant 2 service request if logged in as applicant 2', () => {
      mockReq.session.isApplicant2 = true;

      expect(GeneralAppServiceRequest(mockReq)).toEqual(applicant2GeneralAppServiceRequest);
    });
  });

  describe('GeneralAppOrderSummary', () => {
    test('Should return applicant 1 service request if logged in as applicant 1', () => {
      mockReq.session.isApplicant2 = false;

      expect(GeneralAppOrderSummary(mockReq)).toEqual(applicant1GeneralAppOrderSummary);
    });

    test('Should return applicant 2 service request if logged in as applicant 2', () => {
      mockReq.session.isApplicant2 = true;

      expect(GeneralAppOrderSummary(mockReq)).toEqual(applicant2GeneralAppOrderSummary);
    });
  });

  describe('generalApplicationPaymentsField', () => {
    test('Should return applicant 1 payments field if logged in as applicant 1', () => {
      mockReq.session.isApplicant2 = false;

      expect(generalApplicationPaymentsField(mockReq)).toEqual('applicant1GeneralAppPayments');
    });

    test('Should return applicant 2 payments field if logged in as applicant 2', () => {
      mockReq.session.isApplicant2 = true;

      expect(generalApplicationPaymentsField(mockReq)).toEqual('applicant2GeneralAppPayments');
    });
  });

  describe('findOnlineGeneralApplicationsForUser', () => {
    test('Should return applicant 1 general applications if logged in as applicant 1', () => {
      expect(findOnlineGeneralApplicationsForUser(mockReq.session.userCase, false)).toEqual([
        applicant1GeneralApplications[0].value,
      ]);
    });

    test('Should return applicant 2 general applications if logged in as applicant 2', () => {
      mockReq.session.isApplicant2 = true;

      expect(findOnlineGeneralApplicationsForUser(mockReq.session.userCase, true)).toEqual(
        applicant2GeneralApplications.map(app => app.value)
      );
    });

    test('Should handle undefined general applications', () => {
      mockReq.session.userCase.generalApplications = undefined;

      expect(findOnlineGeneralApplicationsForUser(mockReq.session.userCase, false)).toEqual(undefined);
    });

    test('Should handle empty  general applications', () => {
      mockReq.session.userCase.generalApplications = [];

      expect(findOnlineGeneralApplicationsForUser(mockReq.session.userCase, false)).toEqual([]);
    });
  });

  describe('hasUnpaidGeneralApplication', () => {
    test('Should return true if the party has an unpaid general application', () => {
      expect(hasUnpaidGeneralApplication(mockReq, applicant1GeneralAppServiceRequest)).toEqual(true);
    });

    test('Should return false if no general applications match the service request', () => {
      expect(hasUnpaidGeneralApplication(mockReq, 'dummmy-service-ref')).toEqual(false);
    });

    test('Should return false if the general applications are all paid', () => {
      mockReq.session.isApplicant2 = true;

      expect(hasUnpaidGeneralApplication(mockReq, applicant2GeneralAppServiceRequest)).toEqual(false);
    });

    test('Should return false if the general applications are undefined', () => {
      mockReq.session.userCase.generalApplications = undefined;

      expect(hasUnpaidGeneralApplication(mockReq, applicant2GeneralAppServiceRequest)).toEqual(false);
    });

    test('Should return false if the general applications are blank', () => {
      mockReq.session.userCase.generalApplications = [];

      expect(hasUnpaidGeneralApplication(mockReq, applicant2GeneralAppServiceRequest)).toEqual(false);
    });
  });
});
