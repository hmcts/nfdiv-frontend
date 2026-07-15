import path from 'path';

import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';
import autobind from '../../app/utils/autobind';

import { generateContent } from './content';

@autobind
export class ApplicationWithdrawnGetController extends GetController {
  constructor() {
    super(path.resolve(process.cwd(), 'src/main/steps/application-withdrawn/template'), generateContent);
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
