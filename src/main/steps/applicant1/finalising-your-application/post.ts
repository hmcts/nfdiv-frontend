import autobind from 'autobind-decorator';
import config from 'config';
import dayjs from 'dayjs';
import { Response } from 'express';

import { Case, CaseWithId } from '../../../app/case/case';
import {
  APPLICANT2_FINAL_ORDER_REQUESTED,
  ApplicationType,
  FINAL_ORDER_REQUESTED,
  SWITCH_TO_SOLE_FO,
  State,
  YesOrNo,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { getNextStepUrl } from '../../index';
import { HUB_PAGE } from '../../urls';

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

  protected async saveAndContinue(
    req: AppRequest<AnyObject>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length === 0) {
      try {
        req.session.userCase = await this.save(req, formData, this.getEventName(req));
      } catch (err) {
        req.locals.logger.error('Error saving', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }

    let nextUrl = req.session.errors.length > 0 ? req.url : getNextStepUrl(req, req.session.userCase);

    const hasSwitchedToSoleFo =
      req.session.isApplicant2 &&
      req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION &&
      req.session.userCase.applicant1AppliedForFinalOrderFirst === YesOrNo.YES &&
      req.session.userCase.doesApplicant1IntendToSwitchToSole === YesOrNo.YES &&
      dayjs().isAfter(
        dayjs(req.session.userCase.dateApplicant1DeclaredIntentionToSwitchToSoleFo).add(
          config.get('dates.switchToSoleFinalOrderIntentionNotificationOffsetDays'),
          'day'
        )
      ) &&
      req.session.userCase.state === State.FinalOrderRequested &&
      formData.doesApplicant2WantToApplyForFinalOrder;

    if (hasSwitchedToSoleFo) {
      req.session.isApplicant2 = false;
      nextUrl = req.session.errors.length > 0 ? req.url : HUB_PAGE;
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }

  protected getEventName(req: AppRequest<AnyObject>): string {
    const userCase = req.session.userCase;
    const isApplicant2 = req.session.isApplicant2;

    const dateApplicantDeclaredIntentionToSwitchToSoleFo = isApplicant2
      ? userCase.dateApplicant2DeclaredIntentionToSwitchToSoleFo
      : userCase.dateApplicant1DeclaredIntentionToSwitchToSoleFo;

    const hasApplicantDeclaredIntentionToSwitchToSoleFo =
      (isApplicant2
        ? userCase.doesApplicant2IntendToSwitchToSole === YesOrNo.YES
        : userCase.doesApplicant1IntendToSwitchToSole === YesOrNo.YES) &&
      dayjs().isAfter(dateApplicantDeclaredIntentionToSwitchToSoleFo);

    if (
      hasApplicantDeclaredIntentionToSwitchToSoleFo &&
      dayjs().isAfter(
        dayjs(dateApplicantDeclaredIntentionToSwitchToSoleFo).add(
          config.get('dates.switchToSoleFinalOrderIntentionNotificationOffsetDays'),
          'day'
        )
      ) &&
      userCase.state === State.AwaitingJointFinalOrder
    ) {
      return SWITCH_TO_SOLE_FO;
    }

    return isApplicant2 ? APPLICANT2_FINAL_ORDER_REQUESTED : FINAL_ORDER_REQUESTED;
  }
}
