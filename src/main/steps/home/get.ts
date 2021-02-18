import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { getNextIncompleteStepUrl } from '../../steps';

export class HomeGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    res.redirect(getNextIncompleteStepUrl(req));
  }
}
