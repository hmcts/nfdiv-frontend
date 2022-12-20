import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { APPLICANT_2_APPROVE, ApplicationType, YesOrNo } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { SupportedLanguages } from '../../../modules/i18n';

import ConfirmYourJointApplicationPostController from './post';

describe('ConfirmYourJointApplicationPostController', () => {
  it('triggers APPLICANT_2_APPROVED and sets applicant2UsedWelshTranslationOnSubmission to No', async () => {
    const body = {
      applicant1IConfirmPrayer: '',
      applicant1StatementOfTruth: '',
      applicationType: ApplicationType.JOINT_APPLICATION,
      applicant2IConfirmPrayer: Checkbox.Checked,
      applicant2StatementOfTruth: Checkbox.Checked,
      applicant2ApplyForFinancialOrder: undefined,
      applicant2WhoIsFinancialOrderFor: undefined,
      divorceOrDissolution: 'divorce',
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
      { ...body, applicant2UsedWelshTranslationOnSubmission: YesOrNo.NO },
      APPLICANT_2_APPROVE
    );
  });

  it('sets applicant2UsedWelshTranslationOnSubmission to Yes if Welsh translation used', async () => {
    const body = {
      applicationType: ApplicationType.JOINT_APPLICATION,
      applicant2IConfirmPrayer: Checkbox.Checked,
      applicant2StatementOfTruth: Checkbox.Checked,
      applicant2ApplyForFinancialOrder: undefined,
      applicant2WhoIsFinancialOrderFor: undefined,
      divorceOrDissolution: 'divorce',
    };
    const mockFormContent = {
      fields: {
        applicant2IConfirmPrayer: {},
        applicant2StatementOfTruth: {},
        applicationType: {},
      },
    } as unknown as FormContent;
    const confirmYourAnswerPostController = new ConfirmYourJointApplicationPostController(mockFormContent.fields);

    const req = mockRequest({ body, session: { isApplicant2: true } });
    req.session.lang = SupportedLanguages.Cy;

    const res = mockResponse();
    await confirmYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        applicant2UsedWelshTranslationOnSubmission: YesOrNo.YES,
      },
      APPLICANT_2_APPROVE
    );
  });
});
