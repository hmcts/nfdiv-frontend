import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { APPLICANT_2_APPROVE, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import Applicant2PrayerPostController from '../check-your-answers/post';

@autobind
export default class ConfirmYourJointApplicationPostController extends Applicant2PrayerPostController {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.session.lang === 'cy') {
      formData.applicant2UsedWelshTranslationOnSubmission = YesOrNo.YES;
    }

    return req.locals.api.triggerEvent(req.session.userCase.id, formData, eventName);
  }

  protected getEventName(): string {
    return APPLICANT_2_APPROVE;
  }
}
