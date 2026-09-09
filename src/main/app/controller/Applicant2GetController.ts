import { Response } from 'express';

import autobind from '../../app/utils/autobind.js';
import { HOME_URL } from '../../steps/urls.js';

import { AppRequest } from './AppRequest.js';
import { GetController } from './GetController.js';

@autobind
export class Applicant2GetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.isApplicant2) {
      return res.redirect(HOME_URL);
    }

    super.get(req, res);
  }
}
