import autobind from 'autobind-decorator';
import { Response } from 'express';

import { State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';
import { CHECK_ANSWERS_URL } from '../urls';

import { generateContent } from './content';

@autobind
export default class PayYourFeeGetController extends GetController {
  constructor() {
    super(`${__dirname}/../common/template`, generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.userCase.state !== State.AwaitingPayment) {
      return res.redirect(CHECK_ANSWERS_URL);
    }

    super.get(req, res);
  }
}
