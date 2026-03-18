import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { WITHDRAW_D11_APPLICATION } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';
import { D11_APPLICATION_WITHDRAWN } from '../../../../urls';

import WithdrawD11ApplicationPostController from './post';

describe('WithdrawD11ApplicationPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should withdraw d11 application and save user session', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const controller = new WithdrawD11ApplicationPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, WITHDRAW_D11_APPLICATION);

    expect(req.session.save).toHaveBeenCalled();

    expect(res.redirect).toHaveBeenCalledWith(D11_APPLICATION_WITHDRAWN);
  });
});
