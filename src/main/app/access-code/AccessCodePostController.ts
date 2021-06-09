import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import { getCaseApi } from '../case/CaseApi';
import { CITIZEN_LINK_APPLICANT_2 } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form } from '../form/Form';

@autobind
export class AccessCodePostController extends PostController<AnyObject> {
  constructor(protected readonly form: Form) {
    super(form);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    req.locals.api = getCaseApi(req.session.user, req.locals.logger);

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = this.form.getParsedBody(req.body);

    Object.assign(req.session.userCase, formData);
    this.form.setFormState(req.session.userCase);
    req.session.errors = this.form.getErrors(formData);

    try {
      const caseData = await req.locals.api.getCaseById(formData.applicant2ReferenceNumber);

      if (caseData.invitePin !== formData.applicant2AccessCode) {
        req.session.errors.push({ errorType: 'invalidAccessCode', propertyName: 'applicant2AccessCode' });
      }
    } catch (err) {
      req.session.errors.push({ errorType: 'invalidReference', propertyName: 'applicant2ReferenceNumber' });
    }

    if (req.session.errors.length > 0) {
      res.redirect(req.url);
    }

    try {
      req.session.userCase = await this.save(req, formData, CITIZEN_LINK_APPLICANT_2);
    } catch (err) {
      // do nothing
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
