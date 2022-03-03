import { mockRequest } from '../../test/unit/utils/mockRequest';
import { Checkbox } from '../app/case/case';
import { ApplicationType, Gender, State, YesOrNo } from '../app/case/definition';
import { AppRequest } from '../app/controller/AppRequest';

import { applicant1Sequence } from './applicant1Sequence';
import {
  APPLICANT_2,
  CONTINUE_WITH_YOUR_APPLICATION,
  ENTER_YOUR_ACCESS_CODE,
  HAS_RELATIONSHIP_BROKEN_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
  RESPONDENT,
  REVIEW_THE_APPLICATION,
  YOUR_DETAILS_URL,
} from './urls';

import { getNextIncompleteStepUrl, getNextStepUrl } from './index';

describe('Steps', () => {
  describe('getNextStep()', () => {
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

    it('goes back one page if the step is incomplete & excluded from continue application', () => {
      applicant1Sequence[1].excludeFromContinueApplication = true;

      mockReq.originalUrl = HAS_RELATIONSHIP_BROKEN_URL;
      mockReq.session.userCase.gender = Gender.MALE;
      mockReq.session.userCase.sameSex = Checkbox.Unchecked;
      const actual = getNextIncompleteStepUrl(mockReq);
      expect(actual).toBe(YOUR_DETAILS_URL);
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

    it("uses applicant 1's CO sequence if state is ConditionalOrderDrafted", () => {
      mockReq.session.userCase.state = State.ConditionalOrderDrafted;
      const actual = getNextIncompleteStepUrl(mockReq);
      expect(actual).toBe(CONTINUE_WITH_YOUR_APPLICATION);
    });
  });
});
