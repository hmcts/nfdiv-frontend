import path from 'path';

import autobindDecorator from 'autobind-decorator';

const autobind = ((autobindDecorator as { default?: unknown }).default ??
  autobindDecorator) as unknown as ClassDecorator & MethodDecorator;
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

@autobind
export class RequestForInformationSaveSignOutGetController extends GetController {
  constructor() {
    super(
      path.resolve(process.cwd(), 'src/main/steps/request-for-information-save-sign-out/template'),
      generateContent
    );
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
