import { Case, CaseWithId } from '../../../app/case/case.js';
import { APPLICANT_2_APPROVE, YesOrNo } from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';
import Applicant2PrayerPostController from '../check-your-answers/post.js';

@autobind
export default class ConfirmYourJointApplicationPostController extends Applicant2PrayerPostController {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.session.lang === 'cy') {
      formData.applicant2UsedWelshTranslationOnSubmission = YesOrNo.YES;
    }

    return super.save(req, formData, eventName);
  }

  protected getEventName(): string {
    return APPLICANT_2_APPROVE;
  }
}
