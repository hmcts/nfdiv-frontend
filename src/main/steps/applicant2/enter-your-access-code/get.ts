import { fileURLToPath } from 'node:url';

import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import autobind from '../../../app/utils/autobind';
import { HOME_URL } from '../../urls';

import { generateContent } from './content';

@autobind
export class Applicant2AccessCodeGetController extends GetController {
  constructor() {
    super(fileURLToPath(new URL('./template.njk', import.meta.url)), generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.existingCaseId && !req.session.applicantChoosesNewInviteCase) {
      return res.redirect(HOME_URL);
    }
    await super.get(req, res);
  }
}
