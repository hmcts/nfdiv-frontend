import { Case, CaseWithId } from '../../../app/case/case.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject, PostController } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';

@autobind
export default class EnterTheirNamePostController extends PostController<AnyObject> {
  /**
   * Should reset confirmation of their name if it was resent
   */
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    formData.applicant2ConfirmFullName = null;
    return super.save(req, formData, eventName);
  }
}
