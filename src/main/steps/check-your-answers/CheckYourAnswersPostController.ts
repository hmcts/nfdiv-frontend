import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CITIZEN_SUBMIT } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../app/controller/PostController';
import { Form } from '../../app/form/Form';

@autobind
export class CheckYourAnswersPostController extends PostController<AnyObject> {
  constructor(protected readonly form: Form) {
    super(form);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    await super.post(req, res, CITIZEN_SUBMIT);
  }
}
