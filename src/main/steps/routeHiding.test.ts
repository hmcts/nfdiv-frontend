import { mockRequest } from '../../test/unit/utils/mockRequest';
import { CaseWithId } from '../app/case/case';
import { ApplicationType, State, YesOrNo } from '../app/case/definition';
import { AppRequest } from '../app/controller/AppRequest';

import { ROUTE_HIDE_CONDITIONS, shouldHideRouteFromUser } from './routeHiding';
import {
  ACCESSIBILITY_STATEMENT_URL,
  CHECK_ANSWERS_ALTERNATIVE,
  CHECK_ANSWERS_BAILIFF,
  CHECK_ANSWERS_DEEMED,
  FINALISING_YOUR_APPLICATION,
  PAY_YOUR_SERVICE_FEE,
  PageLink,
  RESPONDENT,
  REVIEW_THE_APPLICATION,
  SERVICE_APPLICATION_SUBMITTED,
} from './urls';

describe('routeHiding', () => {
  let mockReq: AppRequest;
  beforeEach(() => {
    mockReq = mockRequest();
    mockReq.session.userCase = {
      id: '1234',
      applicationType: ApplicationType.JOINT_APPLICATION,
    } as CaseWithId;
  });

  describe('shouldHideRouteFromUser()', () => {
    test('return false if no userCase in session', () => {
      mockReq.session.userCase = false as unknown as CaseWithId;
      const result = shouldHideRouteFromUser(mockReq);
      expect(result).toBeFalsy();
    });

    test('return false if URL is not in the list of conditions', () => {
      mockReq.url = ACCESSIBILITY_STATEMENT_URL;
      const result = shouldHideRouteFromUser(mockReq);
      expect(result).toBeFalsy();
    });

    test('return true if URL fulfils the hide condition', () => {
      mockReq.url = FINALISING_YOUR_APPLICATION;
      mockReq.session.userCase = {
        id: '1234',
        state: State.FinalOrderRequested,
        applicationType: ApplicationType.JOINT_APPLICATION,
      } as CaseWithId;
      const result = shouldHideRouteFromUser(mockReq);
      expect(result).toBeTruthy();
    });
  });

  describe('ROUTE_HIDE_CONDITIONS', () => {
    test('URLs should only be associated with one condition each', () => {
      const allUrls: PageLink[] = ROUTE_HIDE_CONDITIONS.map(i => i.urls).flat();
      expect(new Set(allUrls).size).toEqual(allUrls.length);
    });

    test('check FINALISING_YOUR_APPLICATION condition (state)', () => {
      mockReq.url = FINALISING_YOUR_APPLICATION;
      mockReq.session.userCase.state = State.FinalOrderRequested;
      const result = shouldHideRouteFromUser(mockReq);
      expect(result).toBeTruthy();
    });

    test('check FINALISING_YOUR_APPLICATION condition (applicant1AppliedForFinalOrderFirst)', () => {
      mockReq.url = FINALISING_YOUR_APPLICATION;
      mockReq.session.userCase.applicant1AppliedForFinalOrderFirst = YesOrNo.YES;
      const result = shouldHideRouteFromUser(mockReq);
      expect(result).toBeTruthy();
    });

    test('Dont hide FINALISING_YOUR_APPLICATION when s2s-fo not submitted yet (app1)', () => {
      mockReq.url = FINALISING_YOUR_APPLICATION;
      mockReq.session.userCase.applicant1AppliedForFinalOrderFirst = YesOrNo.YES;
      mockReq.session.userCase.doesApplicant1IntendToSwitchToSole = YesOrNo.YES;
      mockReq.session.userCase.dateApplicant1DeclaredIntentionToSwitchToSoleFo = '2022-10-10';

      mockReq.session.userCase.state = State.AwaitingJointFinalOrder;
      const result = shouldHideRouteFromUser(mockReq);
      expect(result).toBeFalsy();
    });

    test('Hide FINALISING_YOUR_APPLICATION when s2s-fo has been submitted (app1)', () => {
      mockReq.url = FINALISING_YOUR_APPLICATION;
      mockReq.session.userCase.applicant1AppliedForFinalOrderFirst = YesOrNo.YES;
      mockReq.session.userCase.doesApplicant1IntendToSwitchToSole = YesOrNo.YES;
      mockReq.session.userCase.dateApplicant1DeclaredIntentionToSwitchToSoleFo = '2022-10-10';

      mockReq.session.userCase.state = State.FinalOrderRequested;
      const result = shouldHideRouteFromUser(mockReq);
      expect(result).toBeTruthy();
    });

    test('check RESPONDENT/FINALISING_YOUR_APPLICATION condition (state)', () => {
      mockReq.url = `${RESPONDENT}${FINALISING_YOUR_APPLICATION}`;
      mockReq.session.userCase.state = State.FinalOrderRequested;
      const result = shouldHideRouteFromUser(mockReq);
      expect(result).toBeTruthy();
    });

    test('check RESPONDENT/FINALISING_YOUR_APPLICATION condition (applicant2AppliedForFinalOrderFirst)', () => {
      mockReq.url = `${RESPONDENT}${FINALISING_YOUR_APPLICATION}`;
      mockReq.session.userCase.applicant2AppliedForFinalOrderFirst = YesOrNo.YES;
      const result = shouldHideRouteFromUser(mockReq);
      expect(result).toBeTruthy();
    });

    test('Dont hide RESPONDENT/FINALISING_YOUR_APPLICATION when s2s-fo not submitted yet (app2)', () => {
      mockReq.url = `${RESPONDENT}${FINALISING_YOUR_APPLICATION}`;
      mockReq.session.userCase.applicant2AppliedForFinalOrderFirst = YesOrNo.YES;
      mockReq.session.userCase.doesApplicant2IntendToSwitchToSole = YesOrNo.YES;
      mockReq.session.userCase.dateApplicant2DeclaredIntentionToSwitchToSoleFo = '2022-10-10';

      mockReq.session.userCase.state = State.AwaitingJointFinalOrder;
      const result = shouldHideRouteFromUser(mockReq);
      expect(result).toBeFalsy();
    });

    test('Hide RESPONDENT/FINALISING_YOUR_APPLICATION when s2s-fo has been submitted (app2)', () => {
      mockReq.url = `${RESPONDENT}${FINALISING_YOUR_APPLICATION}`;
      mockReq.session.userCase.applicant2AppliedForFinalOrderFirst = YesOrNo.YES;
      mockReq.session.userCase.doesApplicant2IntendToSwitchToSole = YesOrNo.YES;
      mockReq.session.userCase.dateApplicant2DeclaredIntentionToSwitchToSoleFo = '2022-10-10';

      mockReq.session.userCase.state = State.FinalOrderRequested;
      const result = shouldHideRouteFromUser(mockReq);
      expect(result).toBeTruthy();
    });

    test('check AoS URL condition', () => {
      mockReq.url = `${RESPONDENT}${REVIEW_THE_APPLICATION}`;
      mockReq.session.userCase.dateAosSubmitted = '2021-05-10';
      const result = shouldHideRouteFromUser(mockReq);
      expect(result).toBeTruthy();
    });

    describe('Pay Service Fee URL condition', () => {
      test('Visible when service application was made online', () => {
        mockReq.url = PAY_YOUR_SERVICE_FEE;
        mockReq.session.userCase.state = State.AwaitingServicePayment;
        mockReq.session.userCase.serviceApplicationSubmittedOnline = YesOrNo.YES;
        const result = shouldHideRouteFromUser(mockReq);
        expect(result).toBeFalsy();
      });

      test('Not visible when service application was made offline', () => {
        mockReq.url = PAY_YOUR_SERVICE_FEE;
        mockReq.session.userCase.state = State.AwaitingServicePayment;
        const result = shouldHideRouteFromUser(mockReq);
        expect(result).toBeTruthy();
      });
    });

    describe('Service Application Submitted URL condition', () => {
      test('Visible when service application was made online', () => {
        mockReq.url = SERVICE_APPLICATION_SUBMITTED;
        mockReq.session.userCase.state = State.AwaitingServiceConsideration;
        mockReq.session.userCase.serviceApplicationSubmittedOnline = YesOrNo.YES;
        const result = shouldHideRouteFromUser(mockReq);
        expect(result).toBeFalsy();
      });

      test('Not visible when service application was made offline', () => {
        mockReq.url = SERVICE_APPLICATION_SUBMITTED;
        mockReq.session.userCase.state = State.AwaitingServiceConsideration;
        const result = shouldHideRouteFromUser(mockReq);
        expect(result).toBeTruthy();
      });
    });

    describe('Service Application step URL condition', () => {
      test('Not visible in AwaitingServiceConsideration state', () => {
        mockReq.url = CHECK_ANSWERS_DEEMED;
        mockReq.session.userCase.state = State.AwaitingServiceConsideration;
        const result = shouldHideRouteFromUser(mockReq);
        expect(result).toBeTruthy();
      });

      test('Not visible in AwaitingDocuments state', () => {
        mockReq.url = CHECK_ANSWERS_BAILIFF;
        mockReq.session.userCase.state = State.AwaitingDocuments;
        const result = shouldHideRouteFromUser(mockReq);
        expect(result).toBeTruthy();
      });

      test('Not visible in AwaitingServicePayment state', () => {
        mockReq.url = CHECK_ANSWERS_ALTERNATIVE;
        mockReq.session.userCase.state = State.AwaitingServicePayment;
        const result = shouldHideRouteFromUser(mockReq);
        expect(result).toBeTruthy();
      });

      test('Visible in AosOverdue state', () => {
        mockReq.url = CHECK_ANSWERS_DEEMED;
        mockReq.session.userCase.state = State.AosOverdue;
        const result = shouldHideRouteFromUser(mockReq);
        expect(result).toBeFalsy();
      });

      test('Visible in AosDrafted state', () => {
        mockReq.url = CHECK_ANSWERS_DEEMED;
        mockReq.session.userCase.state = State.AosDrafted;
        const result = shouldHideRouteFromUser(mockReq);
        expect(result).toBeFalsy();
      });
    });
  });
});
