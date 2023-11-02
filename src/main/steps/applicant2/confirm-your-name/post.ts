import autobind from 'autobind-decorator';
import { Response } from 'express';

import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { APPLICANT_2, ENTER_YOUR_NAMES } from '../../urls';

@autobind
export default class ConfirmYourNamePostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { applicant2ConfirmFullName } = req.body;
    if (applicant2ConfirmFullName === YesOrNo.NO) {
      res.redirect(APPLICANT_2 + ENTER_YOUR_NAMES);
    } else {
      super.post(req, res);
    }
  }
}
