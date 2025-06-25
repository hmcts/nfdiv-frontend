import autobind from 'autobind-decorator';

import { CITIZEN_UPDATE, UPDATE_CONTACT_DETAILS_AND_REISSUE } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default class SendPapersAgainOrTrySomethingElsePostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    return req.session.userCase.applicant2AddressPrivate ? UPDATE_CONTACT_DETAILS_AND_REISSUE : CITIZEN_UPDATE;
  }
}
