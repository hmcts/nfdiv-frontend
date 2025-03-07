import autobind from 'autobind-decorator';
import { GetController } from '../../app/controller/GetController';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { generateContent } from './content';

@autobind
export class ApplicationWithdrawnGetController extends GetController {
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

      super.get(req, res);
    });
  }
}
