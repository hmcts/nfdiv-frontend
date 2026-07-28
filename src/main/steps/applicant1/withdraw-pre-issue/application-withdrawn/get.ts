import { fileURLToPath } from 'node:url';

import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import autobind from '../../../../app/utils/autobind';

import { generateContent } from './content';

@autobind
export class ApplicationWithdrawnPreIssueGetController extends GetController {
  constructor() {
    super(fileURLToPath(new URL('./template', import.meta.url)), generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    res.locals['email'] = req.session.user?.email;
    res.locals['lang'] = req.session.lang;

    req.session.destroy(err => {
      if (err) {
        throw err;
      }

      super.get(req, res);
    });
  }
}
