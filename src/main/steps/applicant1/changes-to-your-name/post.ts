import { Case, CaseWithId } from '../../../app/case/case.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject, PostController } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';

@autobind
export default class ChangesToYourNamePostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    const emptyOldFields = req.session.userCase.applicant1NameChangedHow?.length
      ? { applicant1NameChangedHow: [], applicant1NameChangedHowOtherDetails: '' }
      : {};

    return req.locals.api.triggerEvent(req.session.userCase.id, { ...formData, ...emptyOldFields }, eventName);
  }
}
