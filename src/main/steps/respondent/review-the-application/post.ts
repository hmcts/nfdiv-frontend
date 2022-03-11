import autobind from 'autobind-decorator';

import { CITIZEN_APPLICANT2_UPDATE, DRAFT_AOS, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class ReviewTheApplicationPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    return req.session.userCase.state === State.AwaitingAos ? DRAFT_AOS : CITIZEN_APPLICANT2_UPDATE;
  }
}
