import { mockRequest } from '../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../test/unit/utils/mockResponse.js';
import { getEndIdamSessionUrl } from '../../app/auth/user/oidc.js';
import { DRAFT_SAVE_AND_SIGN_OUT, SAVE_AND_SIGN_OUT } from '../urls.js';

import { SaveSignOutGetController } from './get.js';

describe('SaveSignOutGetController', () => {
  it('saves and signs out', async () => {
    const controller = new SaveSignOutGetController();

    const req = mockRequest({ session: { user: { email: 'test@example.com' } } });
    const res = mockResponse();
    (res.locals as Record<string, string>).host = 'localhost';
    (req as { path: string }).path = SAVE_AND_SIGN_OUT;
    await controller.get(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(
      303,
      getEndIdamSessionUrl(`https://localhost${SAVE_AND_SIGN_OUT}?lng=en`)
    );
  });

  it('redirects signed out user to cookie target path', async () => {
    const controller = new SaveSignOutGetController();

    const req = mockRequest({
      session: { user: undefined },
      cookies: { 'nfdiv-signout-target': DRAFT_SAVE_AND_SIGN_OUT },
    });
    const res = mockResponse();

    await controller.get(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith('nfdiv-signout-target');
    expect(res.redirect).toHaveBeenCalledWith(DRAFT_SAVE_AND_SIGN_OUT);
    expect(res.render).not.toHaveBeenCalled();
  });

  it('renders save-and-sign-out page for signed out user when no cookie target', async () => {
    const controller = new SaveSignOutGetController();

    const req = mockRequest({ session: { user: undefined }, cookies: {} });
    const res = mockResponse();

    await controller.get(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith('nfdiv-signout-target');
    expect(res.render).toHaveBeenCalled();
  });
});
