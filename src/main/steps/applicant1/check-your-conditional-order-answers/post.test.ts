import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { ApplicationType, SUBMIT_CONDITIONAL_ORDER, YesOrNo } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { SupportedLanguages } from '../../../modules/i18n';

import CheckYourConditionalOrderAnswersPostController from './post';

describe('CheckYourConditionalOrderAnswersPostController', () => {
  const mockFormContent = {
    fields: {
      coApplicant1StatementOfTruth: {},
    },
  } as unknown as FormContent;

  it('triggers SUBMIT_CONDITIONAL_ORDER when submitting conditional order application and sets applicant1UsedWelshTranslationOnSubmission to No', async () => {
    const body = {
      coApplicant1StatementOfTruth: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourConditionalOrderAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body, userCase: { applicationType: ApplicationType.SOLE_APPLICATION } });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { ...body, applicant1UsedWelshTranslationOnSubmission: YesOrNo.NO },
      SUBMIT_CONDITIONAL_ORDER
    );
  });

  it('sets applicant1UsedWelshTranslationOnSubmission to Yes if applicant 1 and Welsh translation used', async () => {
    const body = {
      coApplicant1StatementOfTruth: Checkbox.Checked,
    };
    const checkYourConditionalOrderAnswersPostController = new CheckYourConditionalOrderAnswersPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body });
    req.session.lang = SupportedLanguages.Cy;

    const res = mockResponse();
    await checkYourConditionalOrderAnswersPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        applicant1UsedWelshTranslationOnSubmission: YesOrNo.YES,
      },
      SUBMIT_CONDITIONAL_ORDER
    );
  });

  it('triggers SUBMIT_CONDITIONAL_ORDER when submitting conditional order application and sets applicant2UsedWelshTranslationOnSubmission to No', async () => {
    const body = {
      coApplicant2StatementOfTruth: Checkbox.Checked,
    };
    const mockFormContentApplicant2 = {
      fields: {
        coApplicant2StatementOfTruth: {},
      },
    } as unknown as FormContent;
    const checkYourConditionalOrderAnswersPostController = new CheckYourConditionalOrderAnswersPostController(
      mockFormContentApplicant2.fields
    );

    const req = mockRequest({ body });
    req.session.isApplicant2 = true;

    const res = mockResponse();
    await checkYourConditionalOrderAnswersPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { ...body, applicant2UsedWelshTranslationOnSubmission: YesOrNo.NO },
      SUBMIT_CONDITIONAL_ORDER
    );
  });

  it('sets applicant2UsedWelshTranslationOnSubmission to Yes if applicant 2 and Welsh translation used', async () => {
    const body = {
      coApplicant2StatementOfTruth: Checkbox.Checked,
    };
    const mockFormContentApplicant2 = {
      fields: {
        coApplicant2StatementOfTruth: {},
      },
    } as unknown as FormContent;
    const checkYourConditionalOrderAnswersPostController = new CheckYourConditionalOrderAnswersPostController(
      mockFormContentApplicant2.fields
    );

    const req = mockRequest({ body });
    req.session.lang = SupportedLanguages.Cy;
    req.session.isApplicant2 = true;

    const res = mockResponse();
    await checkYourConditionalOrderAnswersPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        applicant2UsedWelshTranslationOnSubmission: YesOrNo.YES,
      },
      SUBMIT_CONDITIONAL_ORDER
    );
  });
});
