import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { WITHDRAW_SERVICE_APPLICATION } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';
import { SERVICE_APPLICATION_WITHDRAWN } from '../../../../urls';

import WithdrawServiceApplicationPostController from './post';

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
