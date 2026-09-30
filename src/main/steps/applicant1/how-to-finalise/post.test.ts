import { mockRequest } from '../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../test/unit/utils/mockResponse.js';
import { Checkbox } from '../../../app/case/case.js';
import { ApplicationType, INTEND_SWITCH_TO_SOLE_FO } from '../../../app/case/definition.js';
import { FormContent } from '../../../app/form/Form.js';

import HowToFinalisePostController from './post.js';

describe('HowToFinalisePostController', () => {
  const mockFormContent = {
    fields: {
      applicant1IntendsToSwitchToSole: Checkbox.Checked,
    },
  } as unknown as FormContent;

  it('triggers INTEND_SWITCH_TO_SOLE_FO when intending to switch final order', async () => {
    const body = {
      applicant1IntendsToSwitchToSole: Checkbox.Checked,
    };
    const howToFinalisePostController = new HowToFinalisePostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { applicationType: ApplicationType.JOINT_APPLICATION } });
    const res = mockResponse();
    await howToFinalisePostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, INTEND_SWITCH_TO_SOLE_FO);
  });
});
