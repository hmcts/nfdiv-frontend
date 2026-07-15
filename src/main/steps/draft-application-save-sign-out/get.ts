import autobind from 'autobind-decorator';
import { Response } from 'express';

import { endIdamSessionUrl } from '../../app/auth/user/oidc';
import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';
import { getServiceUrl } from '../../app/controller/url';

import { generateContent } from './content';

@autobind
export class DraftApplicationSaveSignOutGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.user) {
      return super.get(req, res);
    }

    res.locals['email'] = req.session.user?.email;
    res.locals['lang'] = req.session.lang;

    req.session.destroy(err => {
      if (err) {
        throw err;
      }

      res.redirect(endIdamSessionUrl(getServiceUrl(req, res, req.path)));
    });
  }
}
