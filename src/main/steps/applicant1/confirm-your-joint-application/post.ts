import { Case, CaseWithId } from '../../../app/case/case.js';
import { CITIZEN_SUBMIT, YesOrNo } from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';
import CheckYourAnswersPostController from '../check-your-answers/post.js';

@autobind
export default class Applicant1ConfirmYourJointApplicationPostController extends CheckYourAnswersPostController {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.session.lang === 'cy') {
      formData.applicant1UsedWelshTranslationOnSubmission = YesOrNo.YES;
    }

    return super.save(req, formData, eventName);
  }

  protected getEventName(): string {
    return CITIZEN_SUBMIT;
  }
}
