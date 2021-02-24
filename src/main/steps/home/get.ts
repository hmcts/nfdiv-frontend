import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { getNextIncompleteStepUrl } from '../../steps';

export class HomeGetController {
  public get(req: AppRequest, res: Response): void {
    if (req.session.userCase.divorceOrDissolution !== res.locals.serviceType) {
      throw new Error('Invalid case type');
    }

    res.redirect(getNextIncompleteStepUrl(req));
  }
}
