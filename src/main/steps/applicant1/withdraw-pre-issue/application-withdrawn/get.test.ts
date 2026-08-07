import { mockRequest } from '../../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse.js';
import { getEndIdamSessionUrl } from '../../../../app/auth/user/oidc.js';
import { SAVE_AND_SIGN_OUT, WITHDRAW_CONFIRMATION } from '../../../urls.js';

import { ApplicationWithdrawnPreIssueGetController } from './get.js';

describe('ApplicationWithdrawnPreIssueGetController', () => {
  const controller = new ApplicationWithdrawnPreIssueGetController();

  test('Should destroy session and redirect to IDAM logout', async () => {
    const req = mockRequest();
    const res = mockResponse();
    (res.locals as Record<string, string>).host = 'localhost';
    (req as { path: string }).path = WITHDRAW_CONFIRMATION;

    await controller.get(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalledWith(
      'nfdiv-signout-target',
      WITHDRAW_CONFIRMATION,
      expect.objectContaining({ httpOnly: true, sameSite: 'lax' })
    );
    expect(res.redirect).toHaveBeenCalledWith(
      303,
      getEndIdamSessionUrl(`https://localhost${SAVE_AND_SIGN_OUT}?lng=en`)
    );
  });
});
