import autobind from 'autobind-decorator';
import { Response } from 'express';

import { ApplicationType, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { SWITCH_TO_SOLE_APPLICATION } from '../../urls';

@autobind
export default class ApplicationTypePostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (
      req.session.userCase.state === State.AwaitingApplicant1Response &&
      req.body.applicationType === ApplicationType.SOLE_APPLICATION
    ) {
      return res.redirect(SWITCH_TO_SOLE_APPLICATION);
    }
    await super.post(req, res);
  }
}
