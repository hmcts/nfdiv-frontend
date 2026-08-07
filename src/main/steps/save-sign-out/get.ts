import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest.js';
import { GetController } from '../../app/controller/GetController.js';
import { destroySessionAndRedirectToSignOutPage, getPostLogoutRedirectPath } from '../../app/controller/signout.js';
import autobind from '../../app/utils/autobind.js';
import { getStepTemplatePath } from '../getStepTemplatePath.js';
import { SAVE_AND_SIGN_OUT } from '../urls.js';

import { generateContent } from './content.js';

@autobind
export class SaveSignOutGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('save-sign-out', 'template'), generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.user) {
      const postLogoutRedirectPath = getPostLogoutRedirectPath(req, res);

      if (postLogoutRedirectPath && postLogoutRedirectPath !== SAVE_AND_SIGN_OUT) {
        return res.redirect(postLogoutRedirectPath);
      }

      return super.get(req, res);
    }

    destroySessionAndRedirectToSignOutPage(req, res, SAVE_AND_SIGN_OUT);
  }
}
