import { mockRequest } from '../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../test/unit/utils/mockResponse.js';
import { getEndIdamSessionUrl } from '../../../app/auth/user/oidc.js';
import { CITIZEN_WITHDRAWN } from '../../../app/case/definition.js';
import { FormContent } from '../../../app/form/Form.js';
import { APPLICATION_WITHDRAWN, SAVE_AND_SIGN_OUT } from '../../urls.js';

import WithdrawApplicationPostController from './post.js';

describe('WithdrawApplicationPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should withdraw case and delete user session', async () => {
    const req = mockRequest();
    const res = mockResponse();
    (res.locals as Record<string, string>).host = 'localhost';

    const controller = new WithdrawApplicationPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_WITHDRAWN);

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
