import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import { getSystemUser } from '../auth/user/oidc';
import { getCaseApi } from '../case/CaseApi';
import { SYSTEM_LINK_APPLICANT_2 } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';
import { Form } from '../form/Form';

@autobind
export class AccessCodePostController {
  constructor(protected readonly form: Form) {}

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const caseworkerUser = await getSystemUser();
    req.locals.api = getCaseApi(caseworkerUser, req.locals.logger);

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = this.form.getParsedBody(req.body);

    formData.respondentUserId = req.session.user.id;
    req.session.errors = this.form.getErrors(formData);
    const caseReference = formData.caseReference?.replace(/-/g, '');

    try {
      const caseData = await req.locals.api.getCaseById(caseReference as string);

      if (caseData.accessCode !== formData.accessCode) {
        req.session.errors.push({ errorType: 'invalidAccessCode', propertyName: 'accessCode' });
      }
    } catch (err) {
      req.session.errors.push({ errorType: 'invalidReference', propertyName: 'caseReference' });
    }

    if (req.session.errors.length === 0) {
      try {
        req.session.userCase = await req.locals.api.triggerEvent(
          caseReference as string,
          formData,
          SYSTEM_LINK_APPLICANT_2
        );
      } catch (err) {
        req.locals.logger.error('Error linking applicant 2 to joint application', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }

    const nextUrl = req.session.errors.length > 0 ? req.url : getNextStepUrl(req, req.session.userCase);

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
