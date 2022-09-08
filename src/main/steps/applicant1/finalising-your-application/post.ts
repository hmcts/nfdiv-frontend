import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { APPLICANT2_FINAL_ORDER_REQUESTED, FINAL_ORDER_REQUESTED, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { SupportedLanguages } from '../../../modules/i18n';

@autobind
export default class FinalisingYourApplicationPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.session.isApplicant2) {
      formData.applicant2UsedWelshTranslationOnSubmission =
        req.session.lang === SupportedLanguages.Cy ? YesOrNo.YES : YesOrNo.NO;
    } else {
      formData.applicant1UsedWelshTranslationOnSubmission =
        req.session.lang === SupportedLanguages.Cy ? YesOrNo.YES : YesOrNo.NO;
    }

    return super.save(req, formData, eventName);
  }

  protected getEventName(req: AppRequest<AnyObject>): string {
    return req.session.isApplicant2 ? APPLICANT2_FINAL_ORDER_REQUESTED : FINAL_ORDER_REQUESTED;
  }
}
