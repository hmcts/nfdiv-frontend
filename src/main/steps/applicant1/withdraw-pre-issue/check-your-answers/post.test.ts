import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CITIZEN_WITHDRAWN } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';

import PreIssueWithdrawPostController from './post';

describe('PreIssueWithdrawPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should withdraw case and delete user session', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const controller = new PreIssueWithdrawPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_WITHDRAWN);

    expect(req.session.destroy).toHaveBeenCalled();
  });
});
