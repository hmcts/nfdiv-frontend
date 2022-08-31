import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';
import { NFDIV_SESSION_COOKIE } from '../../modules/session';
import { generateContent } from '../../steps/save-sign-out/content';

@autobind
export class SaveSignOutGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    res.locals['email'] = req.session.user?.email;
    res.locals['lang'] = req.session.lang;

    req.session.destroy(err => {
      if (err) {
        throw err;
      }
      res.clearCookie(NFDIV_SESSION_COOKIE);
      super.get(req, res);
    });
  }
}
