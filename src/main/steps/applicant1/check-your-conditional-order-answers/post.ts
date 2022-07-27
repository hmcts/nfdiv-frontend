import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { SUBMIT_CONDITIONAL_ORDER, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class CheckYourConditionalOrderAnswersPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.session.lang === 'cy') {
      if (req.session.isApplicant2) {
        formData.applicant2UsedWelshTranslationOnSubmission = YesOrNo.YES;
      } else {
        formData.applicant1UsedWelshTranslationOnSubmission = YesOrNo.YES;
      }
    }

    return super.save(req, formData, eventName);
  }

  protected getEventName(): string {
    return SUBMIT_CONDITIONAL_ORDER;
  }
}
