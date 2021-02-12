import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { getLatestIncompleteStepUrl } from '../../steps/sequence';

export class HomeGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    res.redirect(getLatestIncompleteStepUrl(req));
  }
}
