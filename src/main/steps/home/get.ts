import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { Form } from '../../app/form/Form';
import {
  APPLICANT_2,
  CHECK_ANSWERS_URL,
  YOUR_DETAILS_URL,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from '../../steps/urls';
import { form as firstQuestionFormContent } from '../applicant1/your-details/content';

export class HomeGetController {
  public get(req: AppRequest, res: Response): void {
    if (req.session.userCase.divorceOrDissolution !== res.locals.serviceType) {
      throw new Error('Invalid case type');
    }

    if (req.session.isApplicant2) {
      return res.redirect(APPLICANT_2 + YOU_NEED_TO_REVIEW_YOUR_APPLICATION);
    }

    const firstQuestionForm = new Form(firstQuestionFormContent);
    const isFirstQuestionComplete = firstQuestionForm.getErrors(req.session.userCase).length === 0;

    res.redirect(isFirstQuestionComplete ? CHECK_ANSWERS_URL : YOUR_DETAILS_URL);
  }
}
