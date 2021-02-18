import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController, Translations } from '../../app/controller/GetController';

import { saveAndSignOutContent } from './content';

@autobind
export class SaveSignOutGetController extends GetController {
  constructor(protected readonly content: Translations = { ...saveAndSignOutContent }) {
    super(__dirname + '/template', content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    this.content.common = { ...this.content.common, email: req.session?.user?.jwt.sub };
    req.session.destroy(() => super.get(req, res));
  }
}
