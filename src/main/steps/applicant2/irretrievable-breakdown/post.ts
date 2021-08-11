import autobind from 'autobind-decorator';
import { NextFunction, Response } from 'express';

import { APPLICANT_2_NOT_BROKEN, CITIZEN_APPLICANT2_UPDATE, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';

@autobind
export default class Applicant2IrretrievableBreakdownPostController extends PostController<AnyObject> {
  constructor(protected readonly form: Form) {
    super(form);
  }

  public async post(req: AppRequest<AnyObject>, res: Response, next?: NextFunction): Promise<void> {
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = this.form.getParsedBody(req.body);
    const event =
      formData.applicant2ScreenHasUnionBroken === YesOrNo.NO ? APPLICANT_2_NOT_BROKEN : CITIZEN_APPLICANT2_UPDATE;
    await super.post(req, res, next, event);
  }
}
