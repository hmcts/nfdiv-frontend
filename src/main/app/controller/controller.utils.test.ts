import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { endIdamSessionUrl } from '../auth/user/oidc';
import { CaseWithId } from '../case/case';
import { DivorceOrDissolution, State, YesOrNo } from '../case/definition';
import {
  DRAFT_SAVE_AND_SIGN_OUT,
  REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT,
  SAVE_AND_SIGN_OUT,
} from '../../steps/urls';

import {
  destroySessionAndRedirectToSignOutPage,
  getPostLogoutRedirectPath,
} from './signout';
import { needsToExplainDelay } from './controller.utils';

describe('Controller utils', () => {
  describe('needsToExplainDelay', () => {
    let userCase;
    beforeEach(() => {
      userCase = {
        id: '123',
        state: State.Draft,
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      } as Partial<CaseWithId>;
    });

    it('returns true if Final Order overdue', () => {
      userCase.isFinalOrderOverdue = YesOrNo.YES;
      const result = needsToExplainDelay(userCase);
      expect(result).toBe(true);
    });

    it('returns true if applicant1FinalOrderLateExplanation defined', () => {
      userCase.applicant1FinalOrderLateExplanation = 'Test string';
      const result = needsToExplainDelay(userCase);
      expect(result).toBe(true);
    });

    it('returns true if applicant2FinalOrderLateExplanation defined', () => {
      userCase.applicant2FinalOrderLateExplanation = 'Test string';
      const result = needsToExplainDelay(userCase);
      expect(result).toBe(true);
    });

    it('returns false if AwaitingFinalOrder and no delay reasons provided', () => {
      userCase.state = State.AwaitingFinalOrder;
      const result = needsToExplainDelay(userCase);
      expect(result).toBe(false);
    });
  });

  describe('destroySessionAndRedirectToSignOutPage', () => {
    test('redirects to IDAM sign out with whitelisted callback path', () => {
      const req = mockRequest();
      const res = mockResponse();
      (res.locals as Record<string, string>).host = 'localhost';

      destroySessionAndRedirectToSignOutPage(req, res, DRAFT_SAVE_AND_SIGN_OUT);

      expect(req.session.destroy).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(303, endIdamSessionUrl(`https://localhost${SAVE_AND_SIGN_OUT}?lng=en`));
    });

    test('sets cookie when redirect path differs from callback path', () => {
      const req = mockRequest();
      const res = mockResponse();
      (res.locals as Record<string, string>).host = 'localhost';

      destroySessionAndRedirectToSignOutPage(req, res, REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT);

      expect(res.cookie).toHaveBeenCalledWith(
        'nfdiv-signout-target',
        REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT,
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 5 * 60 * 1000,
          secure: true,
        })
      );
    });

    test('does not set cookie when callback path already requested', () => {
      const req = mockRequest();
      const res = mockResponse();
      (res.locals as Record<string, string>).host = 'localhost';

      destroySessionAndRedirectToSignOutPage(req, res, SAVE_AND_SIGN_OUT);

      expect(res.cookie).not.toHaveBeenCalled();
    });

    test('uses Welsh language query param when session language is cy', () => {
      const req = mockRequest({ session: { lang: 'cy' } });
      const res = mockResponse();
      (res.locals as Record<string, string>).host = 'localhost';

      destroySessionAndRedirectToSignOutPage(req, res, SAVE_AND_SIGN_OUT);

      expect(res.redirect).toHaveBeenCalledWith(303, endIdamSessionUrl(`https://localhost${SAVE_AND_SIGN_OUT}?lng=cy`));
    });
  });

  describe('getPostLogoutRedirectPath', () => {
    test('returns valid redirect target from cookie and clears cookie', () => {
      const req = mockRequest({ cookies: { 'nfdiv-signout-target': DRAFT_SAVE_AND_SIGN_OUT } });
      const res = mockResponse();

      const path = getPostLogoutRedirectPath(req, res);

      expect(path).toBe(DRAFT_SAVE_AND_SIGN_OUT);
      expect(res.clearCookie).toHaveBeenCalledWith('nfdiv-signout-target');
    });

    test('returns undefined for invalid redirect target and still clears cookie', () => {
      const req = mockRequest({ cookies: { 'nfdiv-signout-target': '/invalid' } });
      const res = mockResponse();

      const path = getPostLogoutRedirectPath(req, res);

      expect(path).toBeUndefined();
      expect(res.clearCookie).toHaveBeenCalledWith('nfdiv-signout-target');
    });
  });
});
