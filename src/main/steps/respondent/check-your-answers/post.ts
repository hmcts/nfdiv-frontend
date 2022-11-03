import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { SUBMIT_AOS, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { SupportedLanguages } from '../../../modules/i18n';

@autobind
export default class RespondentCheckYourAnswersPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    formData.applicant2UsedWelshTranslationOnSubmission =
      req.session.lang === SupportedLanguages.Cy ? YesOrNo.YES : YesOrNo.NO;

    return super.save(req, formData, eventName);
  }

  protected getEventName(): string {
    return SUBMIT_AOS;
  }
}
