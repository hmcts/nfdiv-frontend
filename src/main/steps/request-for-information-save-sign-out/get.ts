import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';
import { destroySessionAndRedirectToSignOut } from '../../app/controller/controller.utils';

import { generateContent } from './content';

@autobind
export class RequestForInformationSaveSignOutGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.user) {
      return super.get(req, res);
    }

    res.locals['email'] = req.session.user?.email;
    res.locals['lang'] = req.session.lang;

    destroySessionAndRedirectToSignOut(req, res);
  }
}
