import { mockRequest } from '../../../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse.js';
import { WITHDRAW_SERVICE_APPLICATION } from '../../../../../app/case/definition.js';
import { FormContent } from '../../../../../app/form/Form.js';
import { SERVICE_APPLICATION_WITHDRAWN } from '../../../../urls.js';

import WithdrawServiceApplicationPostController from './post.js';

describe('WithdrawServiceApplicationPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should withdraw service application and save user session', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const controller = new WithdrawServiceApplicationPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, WITHDRAW_SERVICE_APPLICATION);

    expect(req.session.save).toHaveBeenCalled();

    expect(res.redirect).toHaveBeenCalledWith(SERVICE_APPLICATION_WITHDRAWN);
  });
});
