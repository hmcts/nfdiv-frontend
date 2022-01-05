import autobind from 'autobind-decorator';

import {
  APPLICANT_1_CONFIRM_RECEIPT,
  APPLICANT_2_CONFIRM_RECEIPT,
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_UPDATE,
  DRAFT_CONDITIONAL_ORDER,
  State,
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
      return req.session.isApplicant2 ? CITIZEN_APPLICANT2_UPDATE : CITIZEN_UPDATE;
    }
  }
}
