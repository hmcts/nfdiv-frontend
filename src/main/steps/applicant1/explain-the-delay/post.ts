import autobind from 'autobind-decorator';

import {
  APPLICANT2_FINAL_ORDER_REQUESTED,
  FINAL_ORDER_REQUESTED,
  SWITCH_TO_SOLE_FO,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { getSwitchToSoleFoStatus } from '../../common/switch-to-sole-content.utils';

@autobind
export default class ExplainTheDelayPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    if (getSwitchToSoleFoStatus(req.session.userCase, req.session.isApplicant2).isIntendingAndAbleToSwitchToSoleFo) {
      return SWITCH_TO_SOLE_FO;
    } else {
      return req.session.isApplicant2 ? APPLICANT2_FINAL_ORDER_REQUESTED : FINAL_ORDER_REQUESTED;
    }
  }
}
