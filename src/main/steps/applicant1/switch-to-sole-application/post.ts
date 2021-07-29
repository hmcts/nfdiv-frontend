import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { HOME_URL } from '../../urls';

@autobind
export default class SwitchToSoleApplicationPostController {
  constructor(protected readonly form: Form) {}

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (req.body.cancel) {
      // TODO - find out url for Pay and submit page we need to go back to
      res.redirect(HOME_URL);
    }
  }
}
