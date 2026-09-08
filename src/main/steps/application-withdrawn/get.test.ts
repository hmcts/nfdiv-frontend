import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { getEndIdamSessionUrl } from '../../app/auth/user/oidc';
import { APPLICATION_WITHDRAWN, SAVE_AND_SIGN_OUT } from '../urls';

import { ApplicationWithdrawnGetController } from './get';

describe('WithdrawApplicationController', () => {
  const controller = new ApplicationWithdrawnGetController();

  test('Should destroy session and redirect to IDAM logout', async () => {
    const req = mockRequest();
    const res = mockResponse();
    (res.locals as Record<string, string>).host = 'localhost';
    (req as { path: string }).path = APPLICATION_WITHDRAWN;

    await controller.get(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalledWith(
      'nfdiv-signout-target',
      APPLICATION_WITHDRAWN,
      expect.objectContaining({ httpOnly: true, sameSite: 'lax' })
    );
    expect(res.redirect).toHaveBeenCalledWith(
      303,
      getEndIdamSessionUrl(`https://localhost${SAVE_AND_SIGN_OUT}?lng=en`)
    );
  });
});
