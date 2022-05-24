import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { HOME_URL } from '../../urls';

import { generateContent } from './content';

export class Applicant2AccessCodeGetController extends GetController {
  constructor() {
    super(__dirname + '/../../common/template.njk', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.isLinkedToCase) {
      return res.redirect(HOME_URL);
    }

    await super.get(req, res);
  }
}
