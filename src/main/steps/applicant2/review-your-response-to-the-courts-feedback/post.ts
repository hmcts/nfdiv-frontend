import { Case, CaseWithId } from '../../../app/case/case.js';
import { RESPOND_TO_REQUEST_FOR_INFORMATION } from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject, PostController } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';

@autobind
export default class ReviewYourResponsePostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return RESPOND_TO_REQUEST_FOR_INFORMATION;
  }

  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (!formData.app2RfiDraftResponseDetails) {
      formData.app2RfiDraftResponseDetails = undefined;
    }

    return super.save(req, formData, eventName);
  }
}
