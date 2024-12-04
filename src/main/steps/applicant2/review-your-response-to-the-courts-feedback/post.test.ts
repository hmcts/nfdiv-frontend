import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { ApplicationType, RESPOND_TO_REQUEST_FOR_INFORMATION } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import ReviewYourResponsePostController from './post';

describe('ReviewYourResponseToTheCourtsFeedbackPostController', () => {
  const mockFormContent = {
    fields: {
      app2RfiDraftResponseDetails: {},
      app2RfiDraftResponseCannotUploadDocs: {},
    },
  } as unknown as FormContent;

  it('triggers RESPOND_TO_REQUEST_FOR_INFORMATION when submitting clarification', async () => {
    const body = {
      app2RfiDraftResponseDetails: 'test',
      app2RfiDraftResponseCannotUploadDocs: Checkbox.Checked,
    };
    const reviewYourResponsePostController = new ReviewYourResponsePostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { applicationType: ApplicationType.SOLE_APPLICATION } });
    const res = mockResponse();
    await reviewYourResponsePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, RESPOND_TO_REQUEST_FOR_INFORMATION);
  });

  it('sets app2RfiDraftResponseDetails to undefined if null', async () => {
    const body = {
      app2RfiDraftResponseCannotUploadDocs: Checkbox.Checked,
    };
    const reviewYourResponsePostController = new ReviewYourResponsePostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();

    await reviewYourResponsePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        app2RfiDraftResponseDetails: undefined,
      },
      RESPOND_TO_REQUEST_FOR_INFORMATION
    );
  });
});
