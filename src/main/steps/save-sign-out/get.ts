import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController, Translations } from '../../app/controller/GetController';
import { SAVE_SIGN_OUT_URL } from '../../steps/urls';

import { saveAndSignOutContent } from './content';

@autobind
export class SaveSignOutGetController extends GetController {
  constructor(protected readonly content: Translations = { ...saveAndSignOutContent }) {
    super(__dirname + '/template', content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (req.session.user?.email) {
      res.cookie('nfdivEmail', req.session.user.email, { maxAge: 60000 });
      req.session.destroy(() => res.redirect(SAVE_SIGN_OUT_URL));
      return;
    }

    this.content.common = { ...this.content.common, email: req.cookies?.nfdivEmail };
    super.get(req, res);
  }
}
