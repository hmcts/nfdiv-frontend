import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { getEndIdamSessionUrl } from '../../../../app/auth/user/oidc';
import { CITIZEN_WITHDRAWN } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { APPLICANT_1, CHECK_ANSWERS_WITHDRAW, WITHDRAW_CONFIRMATION } from '../../../urls';

import PreIssueWithdrawPostController from './post';

describe('PreIssueWithdrawPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should withdraw case and delete user session', async () => {
    const req = mockRequest();
    const res = mockResponse();
    (res.locals as Record<string, string>).host = 'localhost';
    (req as { path: string }).path = `${APPLICANT_1}${CHECK_ANSWERS_WITHDRAW}`;

    const controller = new PreIssueWithdrawPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_WITHDRAWN);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith(
      getEndIdamSessionUrl(`https://localhost${APPLICANT_1}${WITHDRAW_CONFIRMATION}`)
    );
  });
});
