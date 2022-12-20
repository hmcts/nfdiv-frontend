import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case, CaseWithId } from '../../../app/case/case';
import {
  APPLICANT2_FINAL_ORDER_REQUESTED,
  FINAL_ORDER_REQUESTED,
  SWITCH_TO_SOLE_FO,
  YesOrNo,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { needsToExplainDelay } from '../../../app/controller/controller.utils';
import { SupportedLanguages } from '../../../modules/i18n';
import { getSwitchToSoleFoStatus } from '../../common/switch-to-sole-content.utils';
import { APPLICANT_2, FINALISING_YOUR_APPLICATION } from '../../urls';

@autobind
export default class FinalisingYourApplicationPostController extends PostController<AnyObject> {
  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    if (!needsToExplainDelay(req.session.userCase)) {
      if (req.session.isApplicant2) {
        formData.applicant2UsedWelshTranslationOnSubmission =
          req.session.lang === SupportedLanguages.Cy ? YesOrNo.YES : YesOrNo.NO;
      } else {
        formData.applicant1UsedWelshTranslationOnSubmission =
          req.session.lang === SupportedLanguages.Cy ? YesOrNo.YES : YesOrNo.NO;
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
    return getSwitchToSoleFoStatus(req.session.userCase, req.session.isApplicant2).isIntendingAndAbleToSwitchToSoleFo
      ? SWITCH_TO_SOLE_FO
      : req.session.isApplicant2
      ? APPLICANT2_FINAL_ORDER_REQUESTED
      : FINAL_ORDER_REQUESTED;
  }
}
