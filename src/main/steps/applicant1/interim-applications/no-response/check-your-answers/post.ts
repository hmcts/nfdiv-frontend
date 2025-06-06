import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getSystemUser } from '../../../../../app/auth/user/oidc';
import { getCaseApi } from '../../../../../app/case/case-api';
import { CASEWORKER_REISSUE_APPLICATION } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields } from '../../../../../app/form/Form';
import { NO_RESPONSE_DETAILS_UPDATED } from '../../../../urls';

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

    formData.applicant2Email =
      userCase.applicant2Email !== '' ? userCase.applicant2Email : userCase.applicant1NoResponsePartnerEmailAddress;

    let nextUrl: string;
    req.session.errors = form.getErrors(formData);
    if (req.session.errors.length === 0) {
      try {
        const caseworkerUserApi = getCaseApi(await getSystemUser(), req.locals.logger);
        await caseworkerUserApi.triggerEvent(req.session.existingCaseId, formData, CASEWORKER_REISSUE_APPLICATION);
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
}
