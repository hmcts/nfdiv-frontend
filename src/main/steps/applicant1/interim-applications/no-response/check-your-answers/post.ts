import { Response } from 'express';
import lodash from 'lodash';

const { isEmpty } = lodash;

import { Case } from '../../../../../app/case/case.js';
import {
  NoResponsePartnerNewEmailOrAddress,
  UPDATE_CONTACT_DETAILS_AND_REISSUE,
} from '../../../../../app/case/definition.js';
import { AppRequest } from '../../../../../app/controller/AppRequest.js';
import { AnyObject, PostController } from '../../../../../app/controller/PostController.js';
import { Form } from '../../../../../app/form/Form.js';
import autobind from '../../../../../app/utils/autobind.js';
import { PROVIDE_NEW_EMAIL_ADDRESS } from '../../../../urls.js';

@autobind
export default class CheckAnswersPostController extends PostController<AnyObject> {
  protected async saveAndContinue(
    req: AppRequest<AnyObject>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    if (
      (req.session.userCase.applicant1NoResponsePartnerNewEmailOrAddress === NoResponsePartnerNewEmailOrAddress.EMAIL ||
        req.session.userCase.applicant1NoResponsePartnerNewEmailOrAddress ===
          NoResponsePartnerNewEmailOrAddress.EMAIL_AND_ADDRESS) &&
      isEmpty(req.session.userCase.applicant1NoResponsePartnerEmailAddress)
    ) {
      res.redirect(PROVIDE_NEW_EMAIL_ADDRESS);
    }
    await super.saveAndContinue(req, res, form, formData);
  }

  protected getEventName(): string {
    return UPDATE_CONTACT_DETAILS_AND_REISSUE;
  }
}
