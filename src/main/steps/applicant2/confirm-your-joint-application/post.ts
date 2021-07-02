import autobind from 'autobind-decorator';
import { NextFunction, Response } from 'express';

import { CITIZEN_SUBMIT } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';

@autobind
export default class ConfirmYourJointApplicationPostController extends PostController<AnyObject> {
  constructor(protected readonly form: Form) {
    super(form);
  }

  public async post(req: AppRequest<AnyObject>, res: Response, next?: NextFunction): Promise<void> {
    const event = CITIZEN_SUBMIT; // TODO - create event to change state to 'awaitingApplicant1Response'
    await super.post(req, res, next, event);
  }
}
