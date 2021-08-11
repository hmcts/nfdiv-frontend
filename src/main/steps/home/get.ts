import { Response } from 'express';

import { State, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { Form } from '../../app/form/Form';
import {
  APPLICANT_2,
  APPLICATION_ENDED,
  CHECK_ANSWERS_URL,
  CONFIRM_JOINT_APPLICATION,
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

    if (req.session.userCase.applicant2ScreenHasUnionBroken === YesOrNo.NO) {
      res.redirect(APPLICATION_ENDED);
    } else if (req.session.userCase.state === State.Applicant2Approved) {
      res.redirect(CONFIRM_JOINT_APPLICATION);
    } else {
      res.redirect(isFirstQuestionComplete ? CHECK_ANSWERS_URL : YOUR_DETAILS_URL);
    }
  }
}
