import { mockRequest } from '../../test/unit/utils/mockRequest';
import { CaseWithId } from '../app/case/case';
import { ApplicationType, State } from '../app/case/definition';
import { AppRequest } from '../app/controller/AppRequest';

import { routeHideConditions, shouldHideRouteFromUser } from './routeHiding';
import { ACCESSIBILITY_STATEMENT_URL, FINALISING_YOUR_APPLICATION, PageLink } from './urls';

describe('routeHiding', () => {
  describe('shouldHideRouteFromUser()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    test('return false if no userCase in session', () => {
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
  });
});
