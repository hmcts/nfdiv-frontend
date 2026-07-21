import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';
import {
  destroySessionAndRedirectToSignOutViaCallback,
  getPostLogoutRedirectPath,
} from '../../app/controller/signout';

import { generateContent } from './content';
import { SAVE_AND_SIGN_OUT } from '../urls';

@autobind
export class SaveSignOutGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.user) {
      const postLogoutRedirectPath = getPostLogoutRedirectPath(req, res);

      if (postLogoutRedirectPath && postLogoutRedirectPath !== SAVE_AND_SIGN_OUT) {
        return res.redirect(postLogoutRedirectPath);
      }

      return super.get(req, res);
    }

    res.locals['email'] = req.session.user?.email;
    res.locals['lang'] = req.session.lang;

    destroySessionAndRedirectToSignOutViaCallback(req, res, SAVE_AND_SIGN_OUT);
  }
}
