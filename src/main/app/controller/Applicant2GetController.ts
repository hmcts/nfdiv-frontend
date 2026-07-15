import { Response } from 'express';

import autobind from '../../app/utils/autobind';
import { HOME_URL } from '../../steps/urls';

import { AppRequest } from './AppRequest';
import { GetController } from './GetController';

@autobind
export class Applicant2GetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.isApplicant2) {
      return res.redirect(HOME_URL);
    }

    super.get(req, res);
  }
}
