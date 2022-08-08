import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

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
    if (config.get('envType') === 'PROD') {
      const newInviteUserCase = await req.locals.api.getNewInviteCase(
        req.session.user.email,
        res.locals.serviceType,
        req.locals.logger
      );
      if (!newInviteUserCase) {
        return res.redirect(HOME_URL);
      }
    }
    await super.get(req, res);
  }
}
