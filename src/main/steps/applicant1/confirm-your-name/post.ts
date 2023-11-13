import autobind from 'autobind-decorator';
import { Response } from 'express';

import { ApplicationType, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { ENTER_YOUR_NAME, ENTER_YOUR_NAMES } from '../../urls';

@autobind
export default class ConfirmYourNamePostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { applicant1ConfirmFullName } = req.body;
    if (applicant1ConfirmFullName === YesOrNo.NO) {
      res.redirect(
        req.session.userCase.applicationType === ApplicationType.JOINT_APPLICATION ? ENTER_YOUR_NAMES : ENTER_YOUR_NAME
      );
    } else {
      super.post(req, res);
    }
  }
}
