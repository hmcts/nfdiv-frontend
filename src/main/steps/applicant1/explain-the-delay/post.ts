import { Response } from 'express';

import {
  APPLICANT2_FINAL_ORDER_REQUESTED,
  FINAL_ORDER_REQUESTED,
  SWITCH_TO_SOLE_FO,
  YesOrNo,
} from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject, PostController } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';
import { getSwitchToSoleFoStatus } from '../../common/switch-to-sole-content.utils.js';
import { APPLICANT_2, EXPLAIN_THE_DELAY } from '../../urls.js';

@autobind
export default class ExplainTheDelayPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    if (getSwitchToSoleFoStatus(req.session.userCase, req.session.isApplicant2).isIntendingAndAbleToSwitchToSoleFo) {
      return SWITCH_TO_SOLE_FO;
    } else {
      return req.session.isApplicant2 ? APPLICANT2_FINAL_ORDER_REQUESTED : FINAL_ORDER_REQUESTED;
    }
  }

  protected saveSessionAndRedirect(req: AppRequest, res: Response): void {
    const hasApplicant2SwitchedToSoleFo =
      (req.session.errors === undefined || req.session.errors.length === 0) &&
      req.session.isApplicant2 &&
      req.originalUrl === APPLICANT_2 + EXPLAIN_THE_DELAY &&
      req.session.userCase.finalOrderSwitchedToSole === YesOrNo.YES;

    if (hasApplicant2SwitchedToSoleFo) {
      req.session.isApplicant2 = false;
      req.originalUrl = EXPLAIN_THE_DELAY;
    }

    super.saveSessionAndRedirect(req, res);
  }
}
