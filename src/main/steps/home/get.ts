import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { LANGUAGE_PREFERENCE_URL } from '../urls';

export class HomeGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    res.redirect(LANGUAGE_PREFERENCE_URL);
  }
}
