import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { APPLICANT_2_APPROVE } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import { addWelshTranslationUponSubmissionFormData } from '../../../app/controller/controller.utils';
import Applicant2PrayerPostController from '../check-your-answers/post';

@autobind
export default class ConfirmYourJointApplicationPostController extends Applicant2PrayerPostController {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    return super.save(req, addWelshTranslationUponSubmissionFormData(formData, req.session), eventName);
  }

  protected getEventName(): string {
    return APPLICANT_2_APPROVE;
  }
}
