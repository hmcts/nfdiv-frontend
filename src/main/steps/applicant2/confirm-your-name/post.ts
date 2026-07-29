import { Response } from 'express';

import { YesOrNo } from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject, PostController } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';
import { APPLICANT_2, ENTER_YOUR_NAMES } from '../../urls.js';

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
