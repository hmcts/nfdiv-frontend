import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { endIdamSessionUrl } from '../../../app/auth/user/oidc';
import { CITIZEN_WITHDRAWN } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { APPLICATION_WITHDRAWN } from '../../urls';

import WithdrawApplicationPostController from './post';

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

    expect(res.redirect).toHaveBeenCalledWith(endIdamSessionUrl(`https://localhost${APPLICATION_WITHDRAWN}`));
  });
});
