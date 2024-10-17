import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { ApplicationType, RESPOND_TO_REQUEST_FOR_INFORMATION } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import ReviewYourResponsePostController from './post';

describe('ReviewYourResponseToTheCourtsFeedbackPostController', () => {
  const mockFormContent = {
    fields: {
      app1RfiDraftResponseDetails: {},
      app1RfiDraftResponseCannotUploadDocs: {},
    },
  } as unknown as FormContent;

  it('triggers RESPOND_TO_REQUEST_FOR_INFORMATION when submitting clarification', async () => {
    const body = {
      app1RfiDraftResponseDetails: 'test',
      app1RfiDraftResponseCannotUploadDocs: Checkbox.Checked,
    };
    const reviewYourResponsePostController = new ReviewYourResponsePostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { applicationType: ApplicationType.SOLE_APPLICATION } });
    const res = mockResponse();
    await reviewYourResponsePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, RESPOND_TO_REQUEST_FOR_INFORMATION);
  });

  it('sets app1RfiDraftResponseDetails to undefined if null', async () => {
    const body = {
      app1RfiDraftResponseCannotUploadDocs: Checkbox.Checked,
    };
    const reviewYourResponsePostController = new ReviewYourResponsePostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();

    await reviewYourResponsePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        app1RfiDraftResponseDetails: undefined,
      },
      RESPOND_TO_REQUEST_FOR_INFORMATION
    );
  });
});
