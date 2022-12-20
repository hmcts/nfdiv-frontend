import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { CITIZEN_FINAL_ORDER_DELAY_REASON } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { addWelshTranslationUponSubmissionFormData } from '../../../app/controller/controller.utils';

@autobind
export default class ExplainTheDelayPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    return super.save(req, addWelshTranslationUponSubmissionFormData(formData, req.session), eventName);
  }

  protected getEventName(): string {
    return CITIZEN_FINAL_ORDER_DELAY_REASON;
  }
}
