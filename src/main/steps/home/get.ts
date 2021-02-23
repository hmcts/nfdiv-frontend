import { Response } from 'express';

import { AnyObject } from '../../app/controller/PostController';
import { RequestWithScope } from '../../modules/oidc';
import { getNextIncompleteStepUrl } from '../../steps';

export class HomeGetController {
  public get(req: RequestWithScope<AnyObject>, res: Response): void {
    if (req.session.userCase.divorceOrDissolution !== res.locals.serviceType) {
      throw new Error('Invalid case type');
    }

    res.redirect(getNextIncompleteStepUrl(req));
  }
}
