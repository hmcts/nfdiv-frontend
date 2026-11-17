import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import CitizenUpdateContactDetailsPostController from '../check-phone-number/post';

@autobind
export default class EnterTheirAddressPostController extends CitizenUpdateContactDetailsPostController {
  protected async saveAndContinue(
    req: AppRequest<AnyObject>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    formData.applicant2AddressOverseas ??= YesOrNo.NO;
    await super.saveAndContinue(req, res, form, formData);
  }
}
