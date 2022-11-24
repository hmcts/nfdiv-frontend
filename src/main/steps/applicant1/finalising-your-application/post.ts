import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case, CaseWithId } from '../../../app/case/case';
import {
  APPLICANT2_FINAL_ORDER_REQUESTED,
  FINAL_ORDER_REQUESTED,
  SWITCH_TO_SOLE_FO,
  State,
  YesOrNo,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormError } from '../../../app/form/Form';
import { getSwitchToSoleFinalOrderStatus } from '../../common/switch.to.sole.content.utils';
import { APPLICANT_2, FINALISING_YOUR_APPLICATION } from '../../urls';

@autobind
export default class FinalisingYourApplicationPostController extends PostController<AnyObject> {
  private formData: Partial<Case> = {};
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

  protected getNextUrl(req: AppRequest, errors: FormError[], data: Partial<CaseWithId>): string {
    const hasApplicant2SwitchedToSoleFo =
      req.session.isApplicant2 &&
      req.originalUrl === APPLICANT_2 + FINALISING_YOUR_APPLICATION &&
      req.session.userCase.finalOrderSwitchedToSole === YesOrNo.YES &&
      req.session.userCase.state === State.FinalOrderRequested &&
      this.formData.doesApplicant2WantToApplyForFinalOrder;

    if (hasApplicant2SwitchedToSoleFo) {
      req.session.isApplicant2 = false;
      req.originalUrl = FINALISING_YOUR_APPLICATION;
    }

    return super.getNextUrl(req, errors, data);
  }

  protected async saveAndContinue(
    req: AppRequest<AnyObject>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    this.formData = formData;

    return super.saveAndContinue(req, res, form, formData);
  }

  protected getEventName(req: AppRequest<AnyObject>): string {
    return getSwitchToSoleFinalOrderStatus(req.session.userCase, req.session.isApplicant2)
      .isIntendingAndAbleToSwitchToSoleFinalOrder
      ? SWITCH_TO_SOLE_FO
      : req.session.isApplicant2
      ? APPLICANT2_FINAL_ORDER_REQUESTED
      : FINAL_ORDER_REQUESTED;
  }
}
