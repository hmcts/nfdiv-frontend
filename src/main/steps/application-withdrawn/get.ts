import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';
import autobind from '../../app/utils/autobind';
import { getStepTemplatePath } from '../getStepTemplatePath';

import { generateContent } from './content';

@autobind
export class ApplicationWithdrawnGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('application-withdrawn', 'template'), generateContent);
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
