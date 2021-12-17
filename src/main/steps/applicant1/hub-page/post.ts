import autobind from 'autobind-decorator';

import {
  APPLICANT_1_CONFIRM_RECEIPT,
  APPLICANT_2_CONFIRM_RECEIPT,
  DRAFT_CONDITIONAL_ORDER,
  State,
  UPDATE_CONDITIONAL_ORDER,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class HubPagePostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest): string {
    if (req.session.userCase.state === State.Holding) {
      return req.session.isApplicant2 ? APPLICANT_2_CONFIRM_RECEIPT : APPLICANT_1_CONFIRM_RECEIPT;
    } else if (req.session.userCase.state === State.AwaitingConditionalOrder) {
      return DRAFT_CONDITIONAL_ORDER;
    } else {
      return UPDATE_CONDITIONAL_ORDER;
    }
  }
}
