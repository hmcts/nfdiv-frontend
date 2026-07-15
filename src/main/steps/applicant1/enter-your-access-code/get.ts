import path from 'path';

import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import autobind from '../../../app/utils/autobind';
import { HOME_URL } from '../../urls';

import { generateContent } from './content';

@autobind
export class Applicant1AccessCodeGetController extends GetController {
  constructor() {
    super(
      path.resolve(process.cwd(), 'src/main/steps/applicant1/enter-your-access-code/template.njk'),
      generateContent
    );
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.existingCaseId && !req.session.applicantChoosesNewInviteCase) {
      return res.redirect(HOME_URL);
    }
    await super.get(req, res);
  }
}
