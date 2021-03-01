import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';
import { SIGN_IN_URL } from '../urls';

import { timedOutContent } from './content';

@autobind
export class TimedOutGetController extends GetController {
  constructor() {
    super(__dirname + '/template', timedOutContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.user) {
      req.session.destroy(() => super.get(req, res));
    } else {
      res.redirect(SIGN_IN_URL);
    }
  }
}
