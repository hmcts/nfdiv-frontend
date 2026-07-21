import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { endIdamSessionUrl } from '../../../../app/auth/user/oidc';
import { WITHDRAW_CONFIRMATION } from '../../../urls';

import { ApplicationWithdrawnPreIssueGetController } from './get';

describe('ApplicationWithdrawnPreIssueGetController', () => {
  const controller = new ApplicationWithdrawnPreIssueGetController();

  test('Should destroy session and redirect to IDAM logout', async () => {
    const req = mockRequest();
    const res = mockResponse();
    (res.locals as Record<string, string>).host = 'localhost';
    (req as { path: string }).path = WITHDRAW_CONFIRMATION;

    await controller.get(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(303, endIdamSessionUrl(`https://localhost${WITHDRAW_CONFIRMATION}`));
  });
});
