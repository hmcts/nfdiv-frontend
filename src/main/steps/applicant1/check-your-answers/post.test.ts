import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { Checkbox } from '../../../app/case/case';
import {
  APPLICANT_1_RESUBMIT,
  ApplicationType,
  CITIZEN_SUBMIT,
  DivorceOrDissolution,
  FinancialOrderFor,
  INVITE_APPLICANT_2,
  State,
  YesOrNo,
} from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { SupportedLanguages } from '../../../modules/i18n';

import CheckYourAnswersPostController from './post';

describe('CheckYourAnswersPostController', () => {
  const mockFormContent = {
    fields: {
      applicationType: {},
      state: {},
      applicant1IConfirmPrayer: {},
      applicant1StatementOfTruth: {},
    },
  } as unknown as FormContent;

  it('triggers CITIZEN_SUBMIT when sole application and sets applicant1UsedWelshTranslationOnSubmission to No', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1StatementOfTruth: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourAnswersPostController(mockFormContent.fields);
    const req = mockRequest({ body });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        applicant1UsedWelshTranslationOnSubmission: YesOrNo.NO,
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      },
      CITIZEN_SUBMIT
    );
  });

  it('triggers INVITE_APPLICANT_2 when joint application', async () => {
    const body = {
      applicationType: ApplicationType.JOINT_APPLICATION,
    };
    const checkYourAnswerPostController = new CheckYourAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { ...body, divorceOrDissolution: DivorceOrDissolution.DIVORCE },
      INVITE_APPLICANT_2
    );
  });

  it('triggers APPLICANT_1_RESUBMIT when applicant 1 resubmits', async () => {
    const body = {
      applicationType: ApplicationType.JOINT_APPLICATION,
      state: State.AwaitingApplicant1Response,
    };
    const checkYourAnswerPostController = new CheckYourAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      { ...body, divorceOrDissolution: DivorceOrDissolution.DIVORCE },
      APPLICANT_1_RESUBMIT
    );
  });

  it('adds extra form fields for applicant1', async () => {
    const body = {
      applicationType: ApplicationType.JOINT_APPLICATION,
      state: State.AwaitingApplicant1Response,
    };
    const checkYourAnswerPostController = new CheckYourAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    req.session.userCase.applicant1ApplyForFinancialOrder = YesOrNo.YES;
    req.session.userCase.applicant1WhoIsFinancialOrderFor = [FinancialOrderFor.CHILDREN];

    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        applicant1ApplyForFinancialOrder: YesOrNo.YES,
        applicant1WhoIsFinancialOrderFor: [FinancialOrderFor.CHILDREN],
      },
      APPLICANT_1_RESUBMIT
    );
  });

  it('sets applicant1UsedWelshTranslationOnSubmission to Yes if Welsh translation used', async () => {
    const body = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      state: State.Draft,
      applicant1IConfirmPrayer: Checkbox.Checked,
      applicant1StatementOfTruth: Checkbox.Checked,
    };
    const checkYourAnswerPostController = new CheckYourAnswersPostController(mockFormContent.fields);

    const req = mockRequest({ body });
    req.session.lang = SupportedLanguages.Cy;
    req.session.userCase.applicant1ApplyForFinancialOrder = YesOrNo.YES;
    req.session.userCase.applicant1WhoIsFinancialOrderFor = [FinancialOrderFor.CHILDREN];

    const res = mockResponse();
    await checkYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        divorceOrDissolution: DivorceOrDissolution.DIVORCE,
        applicant1ApplyForFinancialOrder: YesOrNo.YES,
        applicant1WhoIsFinancialOrderFor: [FinancialOrderFor.CHILDREN],
        applicant1UsedWelshTranslationOnSubmission: YesOrNo.YES,
      },
      CITIZEN_SUBMIT
    );
  });
});
