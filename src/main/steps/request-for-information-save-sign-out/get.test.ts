import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { endIdamSessionUrl } from '../../app/auth/user/oidc';
import { REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT, SAVE_AND_SIGN_OUT } from '../urls';

import { RequestForInformationSaveSignOutGetController } from './get';

describe('RequestForInformationSaveSignOutGetController', () => {
  it('saves and signs out', async () => {
    const controller = new RequestForInformationSaveSignOutGetController();

    const req = mockRequest({ session: { user: { email: 'test@example.com' } } });
    const res = mockResponse();
    (res.locals as Record<string, string>).host = 'localhost';
    (req as { path: string }).path = REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT;
    await controller.get(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalledWith(
      'nfdiv-signout-target',
      REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT,
      expect.objectContaining({ httpOnly: true, sameSite: 'lax' })
    );
    expect(res.redirect).toHaveBeenCalledWith(303, endIdamSessionUrl(`https://localhost${SAVE_AND_SIGN_OUT}?lng=en`));
  });
});
