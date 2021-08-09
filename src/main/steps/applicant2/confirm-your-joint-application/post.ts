import autobind from 'autobind-decorator';
import { NextFunction, Response } from 'express';

import { APPLICANT_2_APPROVE } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';

@autobind
export default class ConfirmYourJointApplicationPostController extends PostController<AnyObject> {
  constructor(protected readonly form: Form) {
    super(form);
  }

  public async post(req: AppRequest<AnyObject>, res: Response, next?: NextFunction): Promise<void> {
    await super.post(req, res, next, APPLICANT_2_APPROVE);
  }
}
