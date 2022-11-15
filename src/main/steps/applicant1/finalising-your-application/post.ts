import autobind from 'autobind-decorator';
import config from 'config';
import dayjs from 'dayjs';

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
