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
  generalApplicationFeeOrderSummary,
  generalApplicationPaymentsField,
  generalApplicationServiceRequest,
  hasUnpaidGeneralApplication,
} from './general-application-utils';

describe('GeneralApplicationUtils', () => {
  let mockReq: AppRequest;
  let applicant1GeneralApplicationServiceRequest: string;
  let applicant2GeneralApplicationServiceRequest: string;
  let applicant1GeneralApplicationFeeOrderSummary: OrderSummary;
  let applicant2GeneralApplicationFeeOrderSummary: OrderSummary;
  let applicant1GeneralApplications: ListValue<GeneralApplication>[];
  let applicant2GeneralApplications: ListValue<GeneralApplication>[];

  beforeEach(() => {
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
        id: 'applicant1-genapp-1',
        value: {
          generalApplicationType: GeneralApplicationType.ISSUE_DIVORCE_WITHOUT_CERT,
          generalParties: GeneralParties.APPLICANT,
          generalApplicationSubmittedOnline: YesOrNo.YES,
          generalApplicationFeeServiceRequestReference: applicant1GeneralApplicationServiceRequest,
        },
      },
      {
        id: 'applicant1-genapp-2',
        value: {
          generalApplicationType: GeneralApplicationType.ISSUE_DIVORCE_WITHOUT_CERT,
          generalParties: GeneralParties.APPLICANT,
          generalApplicationSubmittedOnline: YesOrNo.NO,
        },
      },
    ];
    applicant2GeneralApplications = [
      {
        id: 'applicant2-genapp-1',
        value: {
          generalApplicationType: GeneralApplicationType.EXPEDITE,
          generalParties: GeneralParties.RESPONDENT,
          generalApplicationSubmittedOnline: YesOrNo.YES,
          generalApplicationFeeServiceRequestReference: applicant2GeneralApplicationServiceRequest,
          generalApplicationFeePaymentReference: 'REF456',
        },
      },
    ];

    mockReq.session.userCase = {
      id: '1234',
      applicant1GeneralApplicationServiceRequest,
      applicant2GeneralApplicationServiceRequest,
      applicant1GeneralApplicationFeeOrderSummary,
      applicant2GeneralApplicationFeeOrderSummary,
      generalApplications: [...applicant1GeneralApplications, ...applicant2GeneralApplications],
    } as CaseWithId;
  });

  describe('generalApplicationServiceRequest', () => {
    test('Should return applicant 1 service request if logged in as applicant 1', () => {
      mockReq.session.isApplicant2 = false;

      expect(generalApplicationServiceRequest(mockReq)).toEqual(applicant1GeneralApplicationServiceRequest);
    });

    test('Should return applicant 2 service request if logged in as applicant 2', () => {
      mockReq.session.isApplicant2 = true;

      expect(generalApplicationServiceRequest(mockReq)).toEqual(applicant2GeneralApplicationServiceRequest);
    });
  });

  describe('generalApplicationFeeOrderSummary', () => {
    test('Should return applicant 1 service request if logged in as applicant 1', () => {
      mockReq.session.isApplicant2 = false;

      expect(generalApplicationFeeOrderSummary(mockReq)).toEqual(applicant1GeneralApplicationFeeOrderSummary);
    });

    test('Should return applicant 2 service request if logged in as applicant 2', () => {
      mockReq.session.isApplicant2 = true;

      expect(generalApplicationFeeOrderSummary(mockReq)).toEqual(applicant2GeneralApplicationFeeOrderSummary);
    });
  });

  describe('generalApplicationPaymentsField', () => {
    test('Should return applicant 1 payments field if logged in as applicant 1', () => {
      mockReq.session.isApplicant2 = false;

      expect(generalApplicationPaymentsField(mockReq)).toEqual('applicant1GenApplicationPayments');
    });

    test('Should return applicant 2 payments field if logged in as applicant 2', () => {
      mockReq.session.isApplicant2 = true;

      expect(generalApplicationPaymentsField(mockReq)).toEqual('applicant2GenApplicationPayments');
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
      expect(hasUnpaidGeneralApplication(mockReq, applicant1GeneralApplicationServiceRequest)).toEqual(true);
    });

    test('Should return false if no general applications match the service request', () => {
      expect(hasUnpaidGeneralApplication(mockReq, 'dummmy-service-ref')).toEqual(false);
    });

    test('Should return false if the general applications are all paid', () => {
      mockReq.session.isApplicant2 = true;

      expect(hasUnpaidGeneralApplication(mockReq, applicant2GeneralApplicationServiceRequest)).toEqual(false);
    });

    test('Should return false if the general applications are undefined', () => {
      mockReq.session.userCase.generalApplications = undefined;

      expect(hasUnpaidGeneralApplication(mockReq, applicant2GeneralApplicationServiceRequest)).toEqual(false);
    });

    test('Should return false if the general applications are blank', () => {
      mockReq.session.userCase.generalApplications = [];

      expect(hasUnpaidGeneralApplication(mockReq, applicant2GeneralApplicationServiceRequest)).toEqual(false);
    });
  });
});
