import path from 'path';

import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';

import { generateContent } from './content';

@autobind
export class ApplicationWithdrawnPreIssueGetController extends GetController {
  constructor() {
    super(
      path.resolve(process.cwd(), 'src/main/steps/applicant1/withdraw-pre-issue/application-withdrawn/template'),
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
