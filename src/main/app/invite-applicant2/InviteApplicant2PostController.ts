import autobind from 'autobind-decorator';
import { Response } from 'express';

import { ApplicationType } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form } from '../form/Form';

@autobind
export class InviteApplicant2PostController extends PostController<AnyObject> {
  constructor(protected readonly form: Form) {
    super(form);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = this.form.getParsedBody(req.body);

    if (formData.applicationType === ApplicationType.JOINT_APPLICATION) {
      await super.sendToApplicant2ForReview(req, res, formData);
    } else {
      await super.post(req, res);
    }
  }
}
