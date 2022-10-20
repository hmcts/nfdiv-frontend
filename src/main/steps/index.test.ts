import { completeCase } from '../../test/functional/fixtures/completeCase';
import { mockRequest } from '../../test/unit/utils/mockRequest';
import { Checkbox } from '../app/case/case';
import { ApplicationType, Gender, State, YesOrNo } from '../app/case/definition';
import { AppRequest } from '../app/controller/AppRequest';

import {
  APPLICANT_2,
  CHECK_ANSWERS_URL,
  CHECK_CONDITIONAL_ORDER_ANSWERS_URL,
  CONTINUE_WITH_YOUR_APPLICATION,
  ENTER_YOUR_ACCESS_CODE,
  HAS_RELATIONSHIP_BROKEN_URL,
  HOME_URL,
  HUB_PAGE,
  RELATIONSHIP_NOT_BROKEN_URL,
  RESPONDENT,
  REVIEW_THE_APPLICATION,
  UPLOAD_YOUR_DOCUMENTS,
  YOUR_DETAILS_URL,
} from './urls';

import {
  getNextIncompleteStepUrl,
  getNextStepUrl,
  isApplicationReadyToSubmit,
  isConditionalOrderReadyToSubmit,
} from './index';

describe('Steps', () => {
  describe('getNextStepUrl()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the next step when correct details a passed', () => {
      mockReq.originalUrl = YOUR_DETAILS_URL;
      const data = { gender: Gender.MALE };
      expect(getNextStepUrl(mockReq, data)).toBe(HAS_RELATIONSHIP_BROKEN_URL);
    });

    it('moves into a dead end when the response matches', () => {
      mockReq.originalUrl = HAS_RELATIONSHIP_BROKEN_URL;
      const data = { applicant1ScreenHasUnionBroken: YesOrNo.NO };
      const actual = getNextStepUrl(mockReq, data);
      expect(actual).toBe(RELATIONSHIP_NOT_BROKEN_URL);
    });

    it('keeps the query string', () => {
      mockReq.originalUrl = `${YOUR_DETAILS_URL}?customQueryString`;
      const data = { gender: Gender.MALE };
      expect(getNextStepUrl(mockReq, data)).toBe(`${HAS_RELATIONSHIP_BROKEN_URL}?customQueryString`);
    });

    it.each([APPLICANT_2, RESPONDENT])('returns / when the next step for applicant 2 is /applicant2/', prefixUrl => {
      mockReq.originalUrl = prefixUrl + HUB_PAGE;
      expect(getNextStepUrl(mockReq, {})).toBe(HOME_URL);
    });
  });

  describe('getNextIncompleteStepUrl()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the first url that fails validation', () => {
      expect(getNextIncompleteStepUrl(mockReq)).toBe(YOUR_DETAILS_URL);
    });

    it('returns the next incomplete step if previous is valid', () => {
      mockReq.session.userCase.gender = Gender.MALE;
      mockReq.session.userCase.sameSex = Checkbox.Unchecked;
      expect(getNextIncompleteStepUrl(mockReq)).toBe(HAS_RELATIONSHIP_BROKEN_URL);
    });

    it('returns the previous step if its a dead end', () => {
      mockReq.session.userCase.gender = Gender.MALE;
      mockReq.session.userCase.sameSex = Checkbox.Unchecked;
      mockReq.session.userCase.applicant1ScreenHasUnionBroken = YesOrNo.NO;
      const actual = getNextIncompleteStepUrl(mockReq);
      expect(actual).toBe(HAS_RELATIONSHIP_BROKEN_URL);
    });

    it('keeps the query string', () => {
      mockReq.originalUrl = `${YOUR_DETAILS_URL}?customQueryString`;
      mockReq.session.userCase.gender = Gender.MALE;
      mockReq.session.userCase.sameSex = Checkbox.Unchecked;
      expect(getNextIncompleteStepUrl(mockReq)).toBe(`${HAS_RELATIONSHIP_BROKEN_URL}?customQueryString`);
    });

    it('returns the upload-your-documents step if user has not completed the form', () => {
      mockReq.session.userCase = {
        ...mockReq.session.userCase,
        ...completeCase,
        applicant1CannotUpload: Checkbox.Unchecked,
        applicant1CannotUploadDocuments: [],
      };
      const actual = getNextIncompleteStepUrl(mockReq);
      expect(actual).toBe(UPLOAD_YOUR_DOCUMENTS);
    });

    it('returns the check-your-answers step if user has completed the form', () => {
      mockReq.session.userCase = {
        ...mockReq.session.userCase,
        ...completeCase,
      };
      const actual = getNextIncompleteStepUrl(mockReq);
      expect(actual).toBe(CHECK_ANSWERS_URL);
    });

    it("uses applicant 2's sequence if they are logged in as applicant 2", () => {
      mockReq.originalUrl = `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`;
      mockReq.session.isApplicant2 = true;
      mockReq.session.userCase.caseReference = '1234123412341234';
      mockReq.session.userCase.accessCode = 'QWERTY78';
      mockReq.session.userCase.applicationType = ApplicationType.JOINT_APPLICATION;
      const actual = getNextIncompleteStepUrl(mockReq);
      expect(actual).toBe(`${APPLICANT_2}${HAS_RELATIONSHIP_BROKEN_URL}`);
    });

    it("uses respondent's sequence if they are logged in as respondent", () => {
      mockReq.originalUrl = `${RESPONDENT}${ENTER_YOUR_ACCESS_CODE}`;
      mockReq.session.isApplicant2 = true;
      mockReq.session.userCase.caseReference = '1234123412341234';
      mockReq.session.userCase.accessCode = 'QWERTY78';
      mockReq.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;
      const actual = getNextIncompleteStepUrl(mockReq);
      expect(actual).toBe(`${RESPONDENT}${REVIEW_THE_APPLICATION}`);
    });

    it("uses applicant 1's CO sequence if state is ConditionalOrderDrafted/ConditionalOrderPending", () => {
      const testStates = [State.ConditionalOrderPending, State.ConditionalOrderDrafted];
      for (const state of testStates) {
        mockReq.session.userCase.state = state;
        mockReq.session.isApplicant2 = false;
        const actual = getNextIncompleteStepUrl(mockReq);
        expect(actual).toBe(CONTINUE_WITH_YOUR_APPLICATION);
      }
    });

    it("uses applicant 2's CO sequence if state is ConditionalOrderDrafted/ConditionalOrderPending", () => {
      const testStates = [State.ConditionalOrderPending, State.ConditionalOrderDrafted];
      for (const state of testStates) {
        mockReq.session.userCase.state = state;
        mockReq.session.isApplicant2 = true;
        const actual = getNextIncompleteStepUrl(mockReq);
        expect(actual).toBe(`${APPLICANT_2}${CONTINUE_WITH_YOUR_APPLICATION}`);
      }
    });
  });

  describe('isApplicationReadyToSubmit()', () => {
    it('returns false if nextStepUrl is /irretrievable-breakdown', () => {
      const isApplicationReadyToSubmitBoolean = isApplicationReadyToSubmit(HAS_RELATIONSHIP_BROKEN_URL);
      expect(isApplicationReadyToSubmitBoolean).toBeFalsy();
    });

    it('returns true if nextStepUrl is /', () => {
      const isApplicationReadyToSubmitBoolean = isApplicationReadyToSubmit(HOME_URL);
      expect(isApplicationReadyToSubmitBoolean).toBeTruthy();
    });

    it('returns true if nextStepUrl starts with /pay', () => {
      const isApplicationReadyToSubmitBoolean = isApplicationReadyToSubmit('/pay/?lng=eng');
      expect(isApplicationReadyToSubmitBoolean).toBeTruthy();
    });
  });

  describe('isConditionalOrderReadyToSubmit()', () => {
    it('returns false if nextStepUrl is /continue-with-your-application', () => {
      const isApplicationReadyToSubmitBoolean = isConditionalOrderReadyToSubmit(CONTINUE_WITH_YOUR_APPLICATION);
      expect(isApplicationReadyToSubmitBoolean).toBeFalsy();
    });

    it('returns true if nextStepUrl is /', () => {
      const isApplicationReadyToSubmitBoolean = isConditionalOrderReadyToSubmit(HOME_URL);
      expect(isApplicationReadyToSubmitBoolean).toBeTruthy();
    });

    it('returns true if nextStepUrl contains /check-your-conditional-order-answers', () => {
      const isApplicationReadyToSubmitBoolean = isConditionalOrderReadyToSubmit(
        `${CHECK_CONDITIONAL_ORDER_ANSWERS_URL}?lng=eng`
      );
      expect(isApplicationReadyToSubmitBoolean).toBeTruthy();
    });
  });
});
