import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import {
  ApplicationType,
  CITIZEN_APPLICANT2_UPDATE,
  RESPONDENT_APPLY_FOR_FINAL_ORDER,
} from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import HaveYouAppliedForHelpWithFinalOrderFeesPostController from './post';

describe('HaveYouAppliedForHelpWithFinalOrderFeesPostController', () => {
  const mockFormContent = {
    fields: { applicant2FoHelpWithFeesRefNo: null },
  } as unknown as FormContent;

  it('triggers RESPONDENT_APPLY_FOR_FINAL_ORDER when HWF Ref has been provided', async () => {
    const body = {
      applicant2FoHelpWithFeesRefNo: 'Dummy Ref',
    };
    const haveYouAppliedForHelpPostController = new HaveYouAppliedForHelpWithFinalOrderFeesPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body, userCase: { applicationType: ApplicationType.SOLE_APPLICATION } });
    const res = mockResponse();
    await haveYouAppliedForHelpPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, RESPONDENT_APPLY_FOR_FINAL_ORDER);
  });

  it('triggers CITIZEN_APPLICANT2_UPDATE when HWF Ref has not been provided', async () => {
    const body = {
      applicant2FoHelpWithFeesRefNo: null,
    };
    const haveYouAppliedForHelpPostController = new HaveYouAppliedForHelpWithFinalOrderFeesPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body, userCase: { applicationType: ApplicationType.SOLE_APPLICATION } });
    const res = mockResponse();
    await haveYouAppliedForHelpPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, CITIZEN_APPLICANT2_UPDATE);
  });
});
