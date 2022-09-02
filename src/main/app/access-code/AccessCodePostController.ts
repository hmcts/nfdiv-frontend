import autobind from 'autobind-decorator';
import { Response } from 'express';

import { APPLICANT_2, HUB_PAGE, RESPONDENT, SIGN_OUT_URL, YOU_NEED_TO_REVIEW_YOUR_APPLICATION } from '../../steps/urls';
import { getSystemUser } from '../auth/user/oidc';
import { getCaseApi } from '../case/case-api';
import { ApplicationType, SYSTEM_LINK_APPLICANT_2, SYSTEM_UNLINK_APPLICANT } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';

@autobind
export class AccessCodePostController {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {}

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);

    if (req.body.saveAndSignOut || req.body.saveBeforeSessionTimeout) {
      return res.redirect(SIGN_OUT_URL);
    }

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    formData.respondentUserId = req.session.user.id;
    formData.applicant2Email = req.session.user.email;
    req.session.errors = form.getErrors(formData);
    const caseReference = formData.caseReference?.replace(/-/g, '');

    const caseworkerUserApi = getCaseApi(await getSystemUser(), req.locals.logger);

    try {
      const caseData = await caseworkerUserApi.getCaseById(caseReference as string);

      if (caseData.applicationType === ApplicationType.JOINT_APPLICATION) {
        formData.applicant2FirstNames = req.session.user.givenName;
        formData.applicant2LastNames = req.session.user.familyName;
      }

      if (caseData.accessCode !== formData.accessCode?.replace(/\s/g, '').toUpperCase()) {
        req.session.errors.push({ errorType: 'invalidAccessCode', propertyName: 'accessCode' });
        req.locals.logger.error(
          `UserId: "${req.session.user.id}" - Invalid access code for case id: "${caseReference}" (form), ${
            caseData.id
          } (retrieved) with ${caseData.accessCode ? '' : 'un'}defined retrieved access code`
        );
      }
    } catch (err) {
      req.session.errors.push({ errorType: 'invalidReference', propertyName: 'caseReference' });
    }

    if (req.session.errors.length === 0) {
      try {
        req.session.userCase = await caseworkerUserApi.triggerEvent(
          caseReference as string,
          formData,
          SYSTEM_LINK_APPLICANT_2
        );

        req.session.isApplicant2 = true;
      } catch (err) {
        req.locals.logger.error('Error linking applicant 2/respondent to joint application', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }

    if (req.session.errors.length === 0) {
      if (req.session.existingCaseId) {
        req.locals.logger.error(
          `Unlinking userId: "${req.session.user.id}" from existing application: ${req.session.existingCaseId}`
        );
        await req.locals.api.triggerEvent(req.session.existingCaseId, {}, SYSTEM_UNLINK_APPLICANT);
      }
      req.session.existingCaseId = req.session.userCase.id;
      req.session.applicantChoosesNewInviteCase = undefined;
    }

    const nextStep =
      req.session.errors.length > 0
        ? req.url
        : req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION
        ? `${RESPONDENT}${HUB_PAGE}`
        : `${APPLICANT_2}${YOU_NEED_TO_REVIEW_YOUR_APPLICATION}`;

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextStep);
    });
  }
}
