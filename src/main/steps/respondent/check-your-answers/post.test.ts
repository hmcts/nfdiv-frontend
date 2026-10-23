import { mockRequest } from '../../../../test/unit/utils/mockRequest.js';
import { mockResponse } from '../../../../test/unit/utils/mockResponse.js';
import { getEndIdamSessionUrl } from '../../../app/auth/user/oidc.js';
import { Checkbox } from '../../../app/case/case.js';
import { SUBMIT_AOS, YesOrNo } from '../../../app/case/definition.js';
import { FormContent } from '../../../app/form/Form.js';
import { SupportedLanguages } from '../../../modules/i18n/index.js';
import { SAVE_AND_SIGN_OUT } from '../../urls.js';

import RespondentCheckYourAnswersPostController from './post.js';

describe('RespondentCheckYourAnswersPostController', () => {
  it('triggers CITIZEN_SUBMIT', async () => {
    const body = {
      aosStatementOfTruth: Checkbox.Checked,
    };
    const mockFormContent = {
      fields: {
        aosStatementOfTruth: {},
      },
    } as unknown as FormContent;
    const respondentCheckYourAnswerPostController = new RespondentCheckYourAnswersPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body });
    const res = mockResponse();
    await respondentCheckYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', body, SUBMIT_AOS);
  });

  it('sets applicant2UsedWelshTranslationOnSubmission to Yes if Welsh translation used', async () => {
    const body = {
      aosStatementOfTruth: Checkbox.Checked,
    };
    const mockFormContent = {
      fields: {
        aosStatementOfTruth: {},
      },
    } as unknown as FormContent;
    const respondentCheckYourAnswerPostController = new RespondentCheckYourAnswersPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body });
    req.session.lang = SupportedLanguages.Cy;

    const res = mockResponse();
    await respondentCheckYourAnswerPostController.post(req, res);

    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
      '1234',
      {
        ...body,
        applicant2UsedWelshTranslationOnSubmission: YesOrNo.YES,
      },
      SUBMIT_AOS
    );
  });
  it('saves and signs out', async () => {
    const body = {
      aosStatementOfTruth: Checkbox.Checked,
    };
    const mockFormContent = {
      fields: {
        aosStatementOfTruth: {},
      },
    } as unknown as FormContent;
    const respondentCheckYourAnswerPostController = new RespondentCheckYourAnswersPostController(
      mockFormContent.fields
    );

    const req = mockRequest({ body });
    req.body['saveAndSignOut'] = true;

    const res = mockResponse();

    await respondentCheckYourAnswerPostController.post(req, res);

    expect(res.redirect).toHaveBeenLastCalledWith(
      303,
      getEndIdamSessionUrl(`https://localhost${SAVE_AND_SIGN_OUT}?lng=en`)
    );
  });
});
