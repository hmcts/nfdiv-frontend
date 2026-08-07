import { mockRequest } from '../../../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse.js';
import { UPDATE_CONTACT_DETAILS_AND_REISSUE } from '../../../../../app/case/definition.js';
import { FormContent } from '../../../../../app/form/Form.js';

import CheckAnswersPostController from './post.js';

describe('NewPostalAddressPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  it('Set deemed service general application type', async () => {
    const body = {};

    const expectedBody = {};

    const checkAnswersPostController = new CheckAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await checkAnswersPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, UPDATE_CONTACT_DETAILS_AND_REISSUE);
  });
});
