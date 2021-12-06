import autobind from 'autobind-decorator';

import { APPLICANT_2_CONFIRM_RECEIPT, DRAFT_CONDITIONAL_ORDER, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class HubPagePostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest): string {
    if (req.session.userCase.state === State.Holding) {
      return APPLICANT_2_CONFIRM_RECEIPT;
    } else {
      return DRAFT_CONDITIONAL_ORDER;
    }
  }
}
