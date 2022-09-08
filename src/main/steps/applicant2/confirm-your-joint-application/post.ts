import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { APPLICANT_2_APPROVE, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import { SupportedLanguages } from '../../../modules/i18n';
import Applicant2PrayerPostController from '../check-your-answers/post';

@autobind
export default class ConfirmYourJointApplicationPostController extends Applicant2PrayerPostController {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    formData.applicant2UsedWelshTranslationOnSubmission =
      req.session.lang === SupportedLanguages.Cy ? YesOrNo.YES : YesOrNo.NO;

    return super.save(req, formData, eventName);
  }

  protected getEventName(): string {
    return APPLICANT_2_APPROVE;
  }
}
