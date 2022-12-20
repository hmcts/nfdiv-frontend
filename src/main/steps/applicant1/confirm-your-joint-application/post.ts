import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { CITIZEN_SUBMIT, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import { SupportedLanguages } from '../../../modules/i18n';
import CheckYourAnswersPostController from '../check-your-answers/post';

@autobind
export default class Applicant1ConfirmYourJointApplicationPostController extends CheckYourAnswersPostController {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    formData.applicant1UsedWelshTranslationOnSubmission =
      req.session.lang === SupportedLanguages.Cy ? YesOrNo.YES : YesOrNo.NO;

    return super.save(req, formData, eventName);
  }

  protected getEventName(): string {
    return CITIZEN_SUBMIT;
  }
}
