import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { ADD_PARTNER_CONTACT } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import CheckAnswersPostController from './post';

describe('CheckAnswersPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  test('Should submit appropriate event', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const controller = new CheckAnswersPostController(mockFormContent.fields);
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', {}, ADD_PARTNER_CONTACT);
  });
});
