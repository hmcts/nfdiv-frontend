import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { SUBMIT_AOS, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class RespondentCheckYourAnswersPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.session.lang === 'cy') {
      formData.applicant2UsedWelshTranslationOnSubmission = YesOrNo.YES;
    }

    return req.locals.api.triggerEvent(req.session.userCase.id, formData, eventName);
  }

  protected getEventName(): string {
    return SUBMIT_AOS;
  }
}
