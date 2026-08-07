import { mockRequest } from '../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../test/unit/utils/mockResponse.js';
import {
  APPLICANT_2_REQUEST_CHANGES,
  CITIZEN_APPLICANT2_UPDATE,
  DivorceOrDissolution,
  YesOrNo,
} from '../../../app/case/definition.js';
import { FormContent } from '../../../app/form/Form.js';

import CheckYourJointApplicationPostController from './post.js';

describe('CheckYourJointApplicationPostController', () => {
  const mockFormContent = {
    fields: {
      applicant2Confirmation: {
        applicant2Explanation: {},
      },
    },
  } as unknown as FormContent;

  test('Should have no errors and trigger applicant2-request-changes event', async () => {
    const body = { applicant2Confirmation: YesOrNo.NO };
    const controller = new CheckYourJointApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { ...body, divorceOrDissolution: DivorceOrDissolution.DIVORCE },
      APPLICANT_2_REQUEST_CHANGES
    );
  });

  test('Should have no errors and trigger citizen-applicant2-update-application event', async () => {
    const body = { applicant2Confirmation: YesOrNo.YES };
    const controller = new CheckYourJointApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { ...body, divorceOrDissolution: DivorceOrDissolution.DIVORCE },
      CITIZEN_APPLICANT2_UPDATE
    );
  });
});
