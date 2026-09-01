import { mockRequest } from '../../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse.js';
import { getEndIdamSessionUrl } from '../../../../app/auth/user/oidc.js';
import { CITIZEN_WITHDRAWN } from '../../../../app/case/definition.js';
import { FormContent } from '../../../../app/form/Form.js';
import { CHECK_ANSWERS_WITHDRAW, SAVE_AND_SIGN_OUT, WITHDRAW_CONFIRMATION } from '../../../urls.js';

import PreIssueWithdrawPostController from './post.js';

describe('PreIssueWithdrawPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should withdraw case and delete user session', async () => {
    const req = mockRequest();
    const res = mockResponse();
    (res.locals as Record<string, string>).host = 'localhost';
    (req as { path: string }).path = CHECK_ANSWERS_WITHDRAW;

    const controller = new PreIssueWithdrawPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_WITHDRAWN);

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
