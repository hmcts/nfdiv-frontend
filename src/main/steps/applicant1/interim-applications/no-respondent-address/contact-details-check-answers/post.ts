import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case } from '../../../../../app/case/case';
import { CITIZEN_ADD_PARTNER_DETAILS } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form } from '../../../../../app/form/Form';

@autobind
export default class CheckAnswersPostController extends PostController<AnyObject> {
  protected async saveAndContinue(
    req: AppRequest<AnyObject>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    await super.saveAndContinue(req, res, form, formData);
  }

  protected getEventName(): string {
    return CITIZEN_ADD_PARTNER_DETAILS;
  }
}
