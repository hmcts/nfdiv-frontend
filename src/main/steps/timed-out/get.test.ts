import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { endIdamSessionUrl } from '../../app/auth/user/oidc';
import { TIMED_OUT_URL } from '../urls';

import { TimedOutGetController } from './get';

describe('TimedOutGetController', () => {
  const controller = new TimedOutGetController();

  test('Should destroy session and redirect to IDAM logout', async () => {
    const req = mockRequest();
    const res = mockResponse();
    (res.locals as Record<string, string>).host = 'localhost';
    (req as { path: string }).path = TIMED_OUT_URL;

    await controller.get(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(303, endIdamSessionUrl(`https://localhost${TIMED_OUT_URL}`));
  });
});
