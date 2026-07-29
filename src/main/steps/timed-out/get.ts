import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest.js';
import { GetController } from '../../app/controller/GetController.js';
import autobind from '../../app/utils/autobind.js';
import { getStepTemplatePath } from '../getStepTemplatePath.js';

import { generateContent } from './content.js';

@autobind
export class TimedOutGetController extends GetController {
  constructor() {
    super(getStepTemplatePath('timed-out', 'template'), generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    res.locals['lang'] = req.session.lang;

    req.session.destroy(err => {
      if (err) {
        throw err;
      }

      super.get(req, res);
    });
  }
}
