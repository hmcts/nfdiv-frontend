import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';
import { saveAndSignOutContent } from '../../steps/save-sign-out/content';

@autobind
export class SaveSignOutGetController extends GetController {
  constructor() {
    super(__dirname + '/template', saveAndSignOutContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    this.content['common']['email'] = req.session.user?.email;

    req.session.destroy(err => {
      if (err) {
        throw err;
      }

      super.get(req, res);
    });
  }
}
