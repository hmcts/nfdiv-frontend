import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { YOUR_DETAILS_URL } from '../urls';

export class HomeGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    res.redirect(YOUR_DETAILS_URL);
  }
}
