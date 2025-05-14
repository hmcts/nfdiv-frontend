import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CITIZEN_UPDATE, YesOrNo } from '../../../../../app/case/definition';
import { FormContent } from '../../../../../app/form/Form';

import HwfReferenceNumberInputPostController from './post';

describe('HwfReferenceNumberInputPostController', () => {
  const mockFormContent = {
    fields: {},
  } as unknown as FormContent;

  it('Set haveHwfReference to Yes', async () => {
    const body = {};

    const expectedBody = {
      applicant1GenAppsHaveHwfReference: YesOrNo.YES,
    };

    const hwfReferenceNumberInputPostController = new HwfReferenceNumberInputPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await hwfReferenceNumberInputPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', expectedBody, CITIZEN_UPDATE);
  });
});
