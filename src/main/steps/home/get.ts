import { Response } from 'express';

import { State, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { Form } from '../../app/form/Form';
import {
  APPLICANT_2,
  APPLICATION_ENDED,
  APPLICATION_SUBMITTED,
  CHECK_ANSWERS_URL,
  CONFIRM_JOINT_APPLICATION,
  SENT_TO_APPLICANT2_FOR_REVIEW,
  YOUR_DETAILS_URL,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from '../../steps/urls';
import { form as applicant1FirstQuestionForm } from '../applicant1/your-details/content';
import { form as applicant2FirstQuestionForm } from '../applicant2/irretrievable-breakdown/content';

export class HomeGetController {
  public get(req: AppRequest, res: Response): void {
    if (req.session.userCase.divorceOrDissolution !== res.locals.serviceType) {
      throw new Error('Invalid case type');
    }

    const firstQuestionForm = new Form(
      req.session.isApplicant2 ? applicant2FirstQuestionForm : applicant1FirstQuestionForm
    );
    const isFirstQuestionComplete = firstQuestionForm.getErrors(req.session.userCase).length === 0;

    if (req.session.isApplicant2) {
      return res.redirect(
        isFirstQuestionComplete
          ? `${APPLICANT_2}${CHECK_ANSWERS_URL}`
          : `${APPLICANT_2}${YOU_NEED_TO_REVIEW_YOUR_APPLICATION}`
      );
    }

    switch (req.session.userCase.state) {
      case State.AwaitingApplicant1Response: {
        req.session.userCase.applicant2ScreenHasUnionBroken === YesOrNo.NO
          ? res.redirect(APPLICATION_ENDED)
          : res.redirect(CHECK_ANSWERS_URL);
        break;
      }
      case State.AwaitingApplicant2Response: {
        res.redirect(SENT_TO_APPLICANT2_FOR_REVIEW);
        break;
      }
      case State.Applicant2Approved: {
        res.redirect(CONFIRM_JOINT_APPLICATION);
        break;
      }
      case State.Submitted: {
        res.redirect(APPLICATION_SUBMITTED);
        break;
      }
      default: {
        res.redirect(isFirstQuestionComplete ? CHECK_ANSWERS_URL : YOUR_DETAILS_URL);
      }
    }
  }
}
