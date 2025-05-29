import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getSystemUser } from '../../../../../app/auth/user/oidc';
import { getCaseApi } from '../../../../../app/case/case-api';
import { CASEWORKER_REISSUE_APPLICATION, CITIZEN_UPDATE, ReissueOption } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields } from '../../../../../app/form/Form';

@autobind
export default class CheckAnswersPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    let reissueOption: ReissueOption;
    const userCase = req.session.userCase;

    if (
      userCase.applicant1NoResponseUpdateEmailAndPostalAddress === 'newPostalAddress' &&
      userCase.applicant2EmailAddress === null
    ) {
      reissueOption = ReissueOption.OFFLINE_AOS;
    } else {
      reissueOption = ReissueOption.DIGITAL_AOS;
    }

    req.session.userCase.reissueOption = reissueOption;

    const form = new Form(this.fields as FormFields);

    const { ...formData } = form.getParsedBody(req.body);

    await super.save(req, formData, CITIZEN_UPDATE);

    let nextUrl: string;
    req.session.errors = form.getErrors(formData);
    if (req.session.errors.length === 0) {
      try {
        const caseworkerUserApi = getCaseApi(await getSystemUser(), req.locals.logger);
        await caseworkerUserApi.triggerEvent(req.session.existingCaseId, formData, CASEWORKER_REISSUE_APPLICATION);
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
