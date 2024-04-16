import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case, CaseWithId } from '../../../app/case/case';
import {
  APPLICANT2_FINAL_ORDER_REQUESTED,
  ApplicationType,
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_UPDATE,
  FINAL_ORDER_REQUESTED,
  SWITCH_TO_SOLE_FO,
  YesOrNo,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { needsToExplainDelay } from '../../../app/controller/controller.utils';
import { getSwitchToSoleFoStatus } from '../../common/switch-to-sole-content.utils';
import { APPLICANT_2, FINALISING_YOUR_APPLICATION } from '../../urls';

@autobind
export default class FinalisingYourApplicationPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (req.session.lang === 'cy') {
      if (req.session.isApplicant2) {
        formData.applicant2UsedWelshTranslationOnSubmission = YesOrNo.YES;
      } else {
        formData.applicant1UsedWelshTranslationOnSubmission = YesOrNo.YES;
      }
    }

    return super.save(req, formData, eventName);
  }

  protected saveSessionAndRedirect(req: AppRequest, res: Response): void {
    const hasApplicant2SwitchedToSoleFo =
      (req.session.errors === undefined || req.session.errors.length === 0) &&
      req.session.isApplicant2 &&
      req.originalUrl === APPLICANT_2 + FINALISING_YOUR_APPLICATION &&
      req.session.userCase.finalOrderSwitchedToSole === YesOrNo.YES;

    if (hasApplicant2SwitchedToSoleFo) {
      req.session.isApplicant2 = false;
      req.originalUrl = FINALISING_YOUR_APPLICATION;
    }

    super.saveSessionAndRedirect(req, res);
  }

  protected getEventName(req: AppRequest<AnyObject>): string {
    const { userCase, isApplicant2 } = req.session;
    const userCaseType = userCase.applicationType;

    // If a case is overdue (1 year since the final order was eligible), then we need to determine which
    // event to call. For sole applications, only applicant1 needs to explain the delay and
    // for joint applications, both applicants need to explain the delay. This is why we call the
    // CITIZEN_UPDATE and CITIZEN_APPLICANT2_UPDATE if the delay needs to be explained.
    if (needsToExplainDelay(userCase)) {
      if (userCaseType === ApplicationType.SOLE_APPLICATION) {
        return isApplicant2 ? APPLICANT2_FINAL_ORDER_REQUESTED : CITIZEN_UPDATE;
      } else {
        return isApplicant2 ? CITIZEN_APPLICANT2_UPDATE : CITIZEN_UPDATE;
      }
    }

    // If they are trying to switch to sole, we return the SWITCH_TO_SOLE_FO event.
    const switchToSoleFoStatus = getSwitchToSoleFoStatus(userCase, isApplicant2);
    if (switchToSoleFoStatus.isIntendingAndAbleToSwitchToSoleFo) {
      return SWITCH_TO_SOLE_FO;
    }

    // If the final order is not overdue, and they're not trying to switch to sole then we follow the normal flow.
    return isApplicant2 ? APPLICANT2_FINAL_ORDER_REQUESTED : FINAL_ORDER_REQUESTED;
  }
}
