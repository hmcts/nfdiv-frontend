import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getSystemUser } from '../../../app/auth/user/oidc';
import { getCaseApi } from '../../../app/case/case-api';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { HOME_URL } from '../../urls';

import { generateContent } from './content';

@autobind
export class Applicant2AccessCodeGetController extends GetController {
  constructor() {
    super(__dirname + '/template.njk', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const api = getCaseApi(await getSystemUser(), req.locals.logger);
    if (await api.isApplicantAlreadyLinked(res.locals.serviceType, req.session.user)) {
      return res.redirect(HOME_URL);
    }

    await super.get(req, res);
  }
}
