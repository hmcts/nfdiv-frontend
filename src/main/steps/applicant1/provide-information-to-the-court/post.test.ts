import { mockRequest } from '../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../test/unit/utils/mockResponse.js';
import { Checkbox } from '../../../app/case/case.js';
import { ApplicationType, SUBMIT_CLARIFICATION } from '../../../app/case/definition.js';
import { FormContent } from '../../../app/form/Form.js';

import ProvideInformationToTheCourtPostController from './post.js';

describe('ProvideInformationToTheCourtPostController', () => {
  const mockFormContent = {
    fields: {
      coClarificationResponses: {},
      coCannotUploadClarificationDocuments: {},
    },
  } as unknown as FormContent;

  it('triggers SUBMIT_CLARIFICATION when submitting clarification', async () => {
    const body = {
      coClarificationResponses: 'test',
      coCannotUploadClarificationDocuments: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new ProvideInformationToTheCourtPostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { applicationType: ApplicationType.SOLE_APPLICATION } });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, SUBMIT_CLARIFICATION);
  });
});
