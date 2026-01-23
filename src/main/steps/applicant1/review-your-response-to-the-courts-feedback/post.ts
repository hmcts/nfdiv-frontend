import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { RESPOND_TO_REQUEST_FOR_INFORMATION } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class ReviewYourResponsePostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return RESPOND_TO_REQUEST_FOR_INFORMATION;
  }

  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (!formData.app1RfiDraftResponseDetails) {
      formData.app1RfiDraftResponseDetails = undefined;
    }

    return super.save(req, formData, eventName);
  }
}
