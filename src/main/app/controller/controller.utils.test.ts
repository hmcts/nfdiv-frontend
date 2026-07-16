import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { endIdamSessionUrl } from '../auth/user/oidc';
import { CaseWithId } from '../case/case';
import { DivorceOrDissolution, State, YesOrNo } from '../case/definition';

import { destroySessionAndRedirectToSignOut, needsToExplainDelay } from './controller.utils';

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

  describe('destroySessionAndRedirectToSignOut', () => {
    test('destroys session and redirects to IDAM sign out URL', () => {
      const req = mockRequest();
      const res = mockResponse();
      (res.locals as Record<string, string>).host = 'localhost';
      (req as { path: string }).path = '/signout-path';

      destroySessionAndRedirectToSignOut(req, res);

      expect(req.session.destroy).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(endIdamSessionUrl('https://localhost/signout-path'));
    });

    test('uses provided redirect path when supplied', () => {
      const req = mockRequest();
      const res = mockResponse();
      (res.locals as Record<string, string>).host = 'localhost';

      destroySessionAndRedirectToSignOut(req, res, '/custom-path');

      expect(req.session.destroy).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith(endIdamSessionUrl('https://localhost/custom-path'));
    });
  });
});
