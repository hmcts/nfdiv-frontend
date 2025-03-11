import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CITIZEN_WITHDRAW } from '../../app/case/definition';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { APPLICATION_WITHDRAWN } from '../urls';

import { WithdrawApplicationPostController } from './post';

describe('WithdrawApplicationPostController', () => {
  const mockFormContent = {
    fields: {
      existingOrNewApplication: {
        validator: isFieldFilledIn,
      },
    },
  } as unknown as FormContent;

  test('Should withdraw case and delete user session', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const controller = new WithdrawApplicationPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, CITIZEN_WITHDRAW);

    expect(req.session.destroy).toHaveBeenCalled();

    expect(res.redirect).toHaveBeenCalledWith(APPLICATION_WITHDRAWN);
  });
});
