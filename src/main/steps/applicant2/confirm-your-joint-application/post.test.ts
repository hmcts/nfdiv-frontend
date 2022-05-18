import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { APPLICANT_2_APPROVE, ApplicationType, DivorceOrDissolution } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';

import ConfirmYourJointApplicationPostController from './post';

describe('ConfirmYourJointApplicationPostController', () => {
  it('triggers APPLICANT_2_APPROVED', async () => {
    const body = {
      applicant1IConfirmPrayer: '',
      applicant1StatementOfTruth: '',
      applicationType: ApplicationType.JOINT_APPLICATION,
      applicant2IConfirmPrayer: Checkbox.Checked,
      applicant2StatementOfTruth: Checkbox.Checked,
    };
    const mockFormContent = {
      fields: {
        applicant2IConfirmPrayer: {},
        applicant2StatementOfTruth: {},
        applicationType: {},
        applicant1IConfirmPrayer: {},
        applicant1StatementOfTruth: {},
      },
    } as unknown as FormContent;
    const confirmYourAnswerPostController = new ConfirmYourJointApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { isApplicant2: true } });
    const res = mockResponse();
    await confirmYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { ...body, divorceOrDissolution: DivorceOrDissolution.DIVORCE },
      APPLICANT_2_APPROVE
    );
  });
});
