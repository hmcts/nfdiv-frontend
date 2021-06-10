import autobind from 'autobind-decorator';
import { NextFunction, Response } from 'express';

import { ApplicationType, CITIZEN_INVITE_APPLICANT_2, CITIZEN_SUBMIT } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../app/controller/PostController';
import { Form } from '../../app/form/Form';

@autobind
export default class CheckYourAnswersPostController extends PostController<AnyObject> {
  constructor(protected readonly form: Form) {
    super(form);
  }

  public async post(req: AppRequest<AnyObject>, res: Response, next?: NextFunction): Promise<void> {
    const event =
      req.body.applicationType === ApplicationType.JOINT_APPLICATION ? CITIZEN_INVITE_APPLICANT_2 : CITIZEN_SUBMIT;
    await super.post(req, res, next, event);
  }
}
