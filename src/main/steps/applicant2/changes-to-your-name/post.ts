import autobind from 'autobind-decorator';

import { Case, CaseWithId } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class Applicant2ChangesToYourNamePostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    const emptyOldFields = req.session.userCase.applicant2NameChangedHow?.length
      ? { applicant2NameChangedHow: [], applicant2NameChangedHowOtherDetails: '' }
      : {};

    return req.locals.api.triggerEvent(req.session.userCase.id, { ...formData, ...emptyOldFields }, eventName);
  }
}
