import { mockRequest } from '../../test/unit/utils/mockRequest';
import { CaseWithId } from '../app/case/case';
import { ApplicationType, State, YesOrNo } from '../app/case/definition';
import { AppRequest } from '../app/controller/AppRequest';

import { routeHideConditions, shouldHideRouteFromUser } from './routeHiding';
import {
  ACCESSIBILITY_STATEMENT_URL,
  FINALISING_YOUR_APPLICATION,
  PageLink,
  RESPONDENT,
  REVIEW_THE_APPLICATION,
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

  describe('routeHideConditions', () => {
    test('URLs should only be associated with one condition each', () => {
      const allUrls: PageLink[] = routeHideConditions.map(i => i.urls).flat();
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

    test('check RESPONDENT/FINALISING_YOUR_APPLICATION condition (state)', () => {
      mockReq.url = FINALISING_YOUR_APPLICATION;
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

    test('check AoS URL condition', () => {
      mockReq.url = `${RESPONDENT}${REVIEW_THE_APPLICATION}`;
      mockReq.session.userCase.dateAosSubmitted = '2021-05-10';
      const result = shouldHideRouteFromUser(mockReq);
      expect(result).toBeTruthy();
    });
  });
});
