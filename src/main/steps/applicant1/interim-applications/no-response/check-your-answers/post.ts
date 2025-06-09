import autobind from 'autobind-decorator';
import { Response } from 'express';
import { isEmpty } from 'lodash';

import { Case } from '../../../../../app/case/case';
import { SYSTEM_UPDATE_CONTACT_DETAILS } from '../../../../../app/case/definition';
import { toApiFormat } from '../../../../../app/case/to-api-format';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields } from '../../../../../app/form/Form';
import { NO_RESPONSE_DETAILS_UPDATED, PROVIDE_NEW_EMAIL_ADDRESS } from '../../../../urls';

@autobind
export default class CheckAnswersPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(this.fields as FormFields);

    const { ...formData } = form.getParsedBody(req.body);
    const userCase = req.session.userCase;
    userCase.applicant2Address1 = userCase.applicant1NoResponsePartnerAddress1;
    userCase.applicant2Address2 = userCase.applicant1NoResponsePartnerAddress2;
    userCase.applicant2Address3 = userCase.applicant1NoResponsePartnerAddress3;
    userCase.applicant2AddressTown = userCase.applicant1NoResponsePartnerAddressTown;
    userCase.applicant2AddressCountry = userCase.applicant1NoResponsePartnerAddressCountry;
    userCase.applicant2AddressPostcode = userCase.applicant1NoResponsePartnerAddressPostcode;

    formData.applicant2Email = userCase.applicant1NoResponsePartnerEmailAddress;
    formData.applicant2Address = toApiFormat(userCase).applicant2Address;

    //await this.saveAndContinue(req, res, form, formData);

    let nextUrl: string;
    req.session.errors = form.getErrors(formData);
    if (req.session.errors.length === 0) {
      try {
        await super.save(req, formData, this.getEventName());
        nextUrl = NO_RESPONSE_DETAILS_UPDATED;
      } catch (err) {
        req.locals.logger.error('Error saving', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
        nextUrl = req.url;
      }
    } else {
      nextUrl = req.url;
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }

  protected async saveAndContinue(
    req: AppRequest<AnyObject>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);
    if (req.session.errors.length === 0) {
      try {
        if (isEmpty(req.session.userCase.applicant1NoResponsePartnerEmailAddress)) {
          res.redirect(PROVIDE_NEW_EMAIL_ADDRESS);
        } else {
          req.session.userCase = await this.save(req, formData, super.getEventName(req));
        }
      } catch (err) {
        req.locals.logger.error('Error saving', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }
    this.saveSessionAndRedirect(req, res);
  }

  protected getEventName(): string {
    return SYSTEM_UPDATE_CONTACT_DETAILS;
  }
}
