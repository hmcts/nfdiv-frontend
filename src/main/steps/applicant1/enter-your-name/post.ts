import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class EnterYourNamePostController extends PostController<AnyObject> {
  /**
   * Should reset confirmation of your name if it was resent
   */
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.session.isApplicant2) {
      formData.applicant2ConfirmFullName = null;
    } else {
      formData.applicant1ConfirmFullName = null;
    }
    return super.save(req, formData, eventName);
  }
}
