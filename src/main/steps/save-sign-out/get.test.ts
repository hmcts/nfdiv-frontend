import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { endIdamSessionUrl } from '../../app/auth/user/oidc';
import { SAVE_AND_SIGN_OUT } from '../urls';

import { SaveSignOutGetController } from './get';

describe('SaveSignOutGetController', () => {
  it('saves and signs out', async () => {
    const controller = new SaveSignOutGetController();

    const req = mockRequest({ session: { user: { email: 'test@example.com' } } });
    const res = mockResponse();
    (res.locals as Record<string, string>).host = 'localhost';
    (req as { path: string }).path = SAVE_AND_SIGN_OUT;
    await controller.get(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(endIdamSessionUrl(`https://localhost${SAVE_AND_SIGN_OUT}`));
  });
});
