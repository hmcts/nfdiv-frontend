import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { PARTNER_GENDER_URL } from '../urls';

export class HomeGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    res.redirect(PARTNER_GENDER_URL);
  }
}
