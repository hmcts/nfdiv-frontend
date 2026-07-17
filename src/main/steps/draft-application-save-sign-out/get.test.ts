import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { endIdamSessionUrl } from '../../app/auth/user/oidc';
import { DRAFT_SAVE_AND_SIGN_OUT, SAVE_AND_SIGN_OUT } from '../urls';

import { DraftApplicationSaveSignOutGetController } from './get';

describe('DraftApplicationSaveSignOutGetController', () => {
  it('saves and signs out draft', async () => {
    const controller = new DraftApplicationSaveSignOutGetController();

    const req = mockRequest({ session: { user: { email: 'test@example.com' } } });
    const res = mockResponse();
    (res.locals as Record<string, string>).host = 'localhost';
    (req as { path: string }).path = DRAFT_SAVE_AND_SIGN_OUT;
    await controller.get(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalledWith(
      'nfdiv-signout-target',
      DRAFT_SAVE_AND_SIGN_OUT,
      expect.objectContaining({ httpOnly: true, sameSite: 'lax' })
    );
    expect(res.redirect).toHaveBeenCalledWith(endIdamSessionUrl(`https://localhost${SAVE_AND_SIGN_OUT}`));
  });
});
