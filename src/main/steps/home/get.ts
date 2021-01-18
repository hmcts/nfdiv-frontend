import { GetController } from '../../app/controller/GetController';
import { homeContent } from './content';
import { AppRequest } from '../../app/controller/AppRequest';
import { Response } from 'express';
import { LANGUAGE_PREFERENCE_URL } from '../urls';

export class HomeGetController extends GetController {

  constructor() {
    super(__dirname + '/template', homeContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    res.redirect(LANGUAGE_PREFERENCE_URL);
  }

}
