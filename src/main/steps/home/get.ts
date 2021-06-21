import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { Form } from '../../app/form/Form';
import { CHECK_ANSWERS_URL, YOUR_DETAILS_URL, YOU_NEED_TO_REVIEW_YOUR_APPLICATION } from '../../steps/urls';
import { form as firstQuestionFormContent } from '../your-details/content';

export class HomeGetController {
  public get(req: AppRequest, res: Response): void {
    if (req.session.userCase.divorceOrDissolution !== res.locals.serviceType) {
      throw new Error('Invalid case type');
    }

    if (req.locals.api.isApplicant2()) {
      return res.redirect(YOU_NEED_TO_REVIEW_YOUR_APPLICATION);
    }

    const firstQuestionForm = new Form(firstQuestionFormContent);
    const isFirstQuestionComplete = firstQuestionForm.getErrors(req.session.userCase).length === 0;

    res.redirect(isFirstQuestionComplete ? CHECK_ANSWERS_URL : YOUR_DETAILS_URL);
  }
}
