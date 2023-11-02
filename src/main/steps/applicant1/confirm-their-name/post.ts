import autobind from 'autobind-decorator';
import { Response } from 'express';

import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { THEIR_NAME } from '../../urls';

@autobind
export default class ConfirmYourNamePostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { applicant2ConfirmFullName } = req.body;
    if (applicant2ConfirmFullName === YesOrNo.NO) {
      res.redirect(THEIR_NAME);
    } else {
      super.post(req, res);
    }
  }
}
