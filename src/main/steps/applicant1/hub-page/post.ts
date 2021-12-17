import autobind from 'autobind-decorator';

import { APPLICANT_1_CONFIRM_RECEIPT, DRAFT_CONDITIONAL_ORDER, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class HubPagePostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    return req.session.userCase.state === State.AwaitingConditionalOrder
      ? DRAFT_CONDITIONAL_ORDER
      : APPLICANT_1_CONFIRM_RECEIPT;
  }
}
