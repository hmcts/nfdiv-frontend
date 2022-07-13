import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getSystemUser } from '../../app/auth/user/oidc';
import { getCaseApi } from '../../app/case/case-api';
import { SYSTEM_CANCEL_CASE_INVITE } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../app/controller/PostController';
import { Form, FormFields } from '../../app/form/Form';
import { APPLICANT_2, ENTER_YOUR_ACCESS_CODE, HOME_URL, SAVE_AND_SIGN_OUT } from '../urls';

import { existingOrNew } from './content';

@autobind
export class ExistingApplicationPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(this.fields as FormFields);

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    if (saveAndSignOut || saveBeforeSessionTimeout) {
      res.redirect(SAVE_AND_SIGN_OUT);
    } else {
      let nextUrl: string;
      req.session.errors = form.getErrors(formData);
      if (req.session.errors.length === 0) {
        try {
          if (formData.existingOrNewApplication === existingOrNew.Existing) {
            const caseworkerUser = await getSystemUser();
            req.locals.api = getCaseApi(caseworkerUser, req.locals.logger);

            await req.locals.api.triggerEvent(req.session.inviteCaseId, {}, SYSTEM_CANCEL_CASE_INVITE);

            req.session.userCase = await req.locals.api.getCaseById(req.session.existingCaseId);
            req.session.isApplicant2 = await req.locals.api.isApplicant2(req.session.userCase.id, req.session.user.id);

            nextUrl = HOME_URL;
          } else {
            nextUrl = `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`;
          }
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
}
