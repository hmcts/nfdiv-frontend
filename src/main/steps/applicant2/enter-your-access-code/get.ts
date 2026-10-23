import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest.js';
import { GetController } from '../../../app/controller/GetController.js';
import autobind from '../../../app/utils/autobind.js';
import { getStepTemplatePath } from '../../getStepTemplatePath.js';
import { HOME_URL } from '../../urls.js';

import { generateContent } from './content.js';

@autobind
export class Applicant2AccessCodeGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('applicant2/enter-your-access-code', 'template.njk'), generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.existingCaseId && !req.session.applicantChoosesNewInviteCase) {
      return res.redirect(HOME_URL);
    }
    await super.get(req, res);
  }
}
