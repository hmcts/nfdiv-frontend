import { Response } from 'express';

import { CaseApi } from '../../app/case/CaseApi';
import { AppRequest } from '../../app/controller/AppRequest';
import { CHECK_ANSWERS_URL, YOUR_DETAILS_URL } from '../../steps/urls';

export class HomeGetController {
  public get(req: AppRequest, res: Response): void {
    if (req.session.userCase.divorceOrDissolution !== res.locals.serviceType) {
      throw new Error('Invalid case type');
    }

    const isCasePartiallyComplete = Object.entries(req.session.userCase).some(
      ([key, value]) => !CaseApi.READONLY_FIELDS.includes(key) && value
    );

    res.redirect(isCasePartiallyComplete ? CHECK_ANSWERS_URL : YOUR_DETAILS_URL);
  }
}
