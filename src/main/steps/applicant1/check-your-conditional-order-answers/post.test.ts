import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import { ApplicationType, SUBMIT_CONDITIONAL_ORDER, YesOrNo } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { SupportedLanguages } from '../../../modules/i18n';
import { APPLICANT_2, REVIEW_YOUR_JOINT_APPLICATION } from '../../urls';

import CheckYourConditionalOrderAnswersPostController from './post';

describe('CheckYourConditionalOrderAnswersPostController', () => {
  const mockFormContent = {
    fields: {
      coApplicant1StatementOfTruth: {},
    },
  } as unknown as FormContent;

  it('triggers SUBMIT_CONDITIONAL_ORDER when submitting conditional order application', async () => {
    const body = {
      coApplicant1StatementOfTruth: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourConditionalOrderAnswersPostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      userCase: {
        applicationType: ApplicationType.SOLE_APPLICATION,
        applicant1ConfirmInformationStillCorrect: YesOrNo.YES,
      },
    });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, SUBMIT_CONDITIONAL_ORDER);
  });

  it('Triggers SUBMIT_CONDITIONAL_ORDER when submitting conditional order application with information not correct and reason provided', async () => {
    const body = {
      coApplicant1StatementOfTruth: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourConditionalOrderAnswersPostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      userCase: {
        applicationType: ApplicationType.SOLE_APPLICATION,
        applicant1ConfirmInformationStillCorrect: YesOrNo.NO,
        applicant1ReasonInformationNotCorrect: 'test',
      },
    });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, SUBMIT_CONDITIONAL_ORDER);
  });

  it("Doesn't trigger SUBMIT_CONDITIONAL_ORDER when submitting conditional order application for applicant1 with information not correct and no reason provided", async () => {
    const body = {
      coApplicant1StatementOfTruth: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourConditionalOrderAnswersPostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      userCase: {
        applicationType: ApplicationType.SOLE_APPLICATION,
      },
    });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).not.toHaveBeenCalledWith('1234', body, SUBMIT_CONDITIONAL_ORDER);
    expect(res.redirect).toHaveBeenCalledWith(`${REVIEW_YOUR_JOINT_APPLICATION}`);
    expect(req.session.errors).toStrictEqual([]);
  });

  it("Doesn't trigger SUBMIT_CONDITIONAL_ORDER when submitting conditional order application for applicant2 with information not correct and no reason provided", async () => {
    const body = {
      coApplicant2StatementOfTruth: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourConditionalOrderAnswersPostController(mockFormContent.fields);

    const req = mockRequest({
      body,
      userCase: {
        applicationType: ApplicationType.SOLE_APPLICATION,
        applicant2ConfirmInformationStillCorrect: YesOrNo.NO,
      },
    });
    req.session.isApplicant2 = true;
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).not.toHaveBeenCalledWith('1234', body, SUBMIT_CONDITIONAL_ORDER);
    expect(res.redirect).toHaveBeenCalledWith(`${APPLICANT_2 + REVIEW_YOUR_JOINT_APPLICATION}`);
    expect(req.session.errors).toStrictEqual([]);
  });

  it('sets applicant1UsedWelshTranslationOnSubmission to Yes if applicant 1 and Welsh translation used', async () => {
    const body = {
      coApplicant1StatementOfTruth: Checkbox.Checked,
    };
    const checkYourConditionalOrderAnswersPostController = new CheckYourConditionalOrderAnswersPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body, userCase: { applicant1ConfirmInformationStillCorrect: YesOrNo.YES } });
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

    const req = mockRequest({ body, userCase: { applicant2ConfirmInformationStillCorrect: YesOrNo.YES } });
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
