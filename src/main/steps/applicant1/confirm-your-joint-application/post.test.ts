import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { CITIZEN_SUBMIT, DivorceOrDissolution, YesOrNo } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { SupportedLanguages } from '../../../modules/i18n';

import Applicant1ConfirmYourJointApplicationPostController from './post';

describe('Applicant1ConfirmYourJointApplicationPostController', () => {
  it('triggers CITIZEN_SUBMIT', async () => {
    const body = {
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1StatementOfTruth: Checkbox.Checked,
      "citizenPaymentCallbackUrl": "https://undefined/payment-callback"
    };
    const mockFormContent = {
      fields: {
        applicant1IConfirmPrayer: {},
        applicant1StatementOfTruth: {},
      },
    } as unknown as FormContent;
    const applicant1ConfirmYourJointApplicationPostController = new Applicant1ConfirmYourJointApplicationPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body, session: { isApplicant2: false } });
    const res = mockResponse();
    await applicant1ConfirmYourJointApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { ...body, divorceOrDissolution: DivorceOrDissolution.DIVORCE },
      CITIZEN_SUBMIT
    );
  });

  it('sets applicant1UsedWelshTranslationOnSubmission to Yes if Welsh translation used', async () => {
    const body = {
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1StatementOfTruth: Checkbox.Checked,
      "citizenPaymentCallbackUrl": "https://undefined/payment-callback"
    };
    const mockFormContent = {
      fields: {
        applicant1IConfirmPrayer: {},
        applicant1StatementOfTruth: {},
      },
    } as unknown as FormContent;
    const applicant1ConfirmYourJointApplicationPostController = new Applicant1ConfirmYourJointApplicationPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body });
    req.session.lang = SupportedLanguages.Cy;

    const res = mockResponse();
    await applicant1ConfirmYourJointApplicationPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        applicant1UsedWelshTranslationOnSubmission: YesOrNo.YES,
      },
      CITIZEN_SUBMIT
    );
  });
});
