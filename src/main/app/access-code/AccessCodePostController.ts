import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { APPLICANT_2, HOME_URL, SIGN_OUT_URL } from '../../steps/urls';
import { getSystemUser } from '../auth/user/oidc';
import { getCaseApi } from '../case/case-api';
import { SYSTEM_LINK_APPLICANT_1, SYSTEM_LINK_APPLICANT_2, SYSTEM_UNLINK_APPLICANT, State } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';

const logger = Logger.getLogger('access-code-post-controller');

@autobind
export class AccessCodePostController {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {}

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);

    if (req.body.saveAndSignOut || req.body.saveBeforeSessionTimeout) {
      return res.redirect(SIGN_OUT_URL);
    }

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    //Set app2 name in form data only when state is AwaitingApplicant2Response
    if (req.path.includes(APPLICANT_2)) {
      formData.applicant2Email = req.session.user.email;
      formData.respondentUserId = req.session.user.id;
      const caseState = req.session.userCase?.state;
      if (caseState === State.AwaitingApplicant2Response) {
        formData.applicant2FirstNames = req.session.user.givenName;
        formData.applicant2LastNames = req.session.user.familyName;
      }
    } else {
      formData.applicant1Email = req.session.user.email;
      formData.applicant1UserId = req.session.user.id;
    }
    req.session.errors = form.getErrors(formData);
    const caseReference = formData.caseReference?.replace(/-/g, '');

    const caseworkerUserApi = getCaseApi(await getSystemUser(), req.locals.logger);
    try {
      const caseData = await caseworkerUserApi.getCaseById(caseReference as string);

      logger.info(`AccessCodePostController invoked for case ID: ${caseReference}`);

      const expectedAccessCode = req.path.includes(APPLICANT_2) ? caseData.accessCode : caseData.accessCodeApplicant1;
      if (expectedAccessCode !== formData.accessCode?.replace(/\s/g, '').toUpperCase()) {
        req.session.errors.push({ errorType: 'invalidAccessCode', propertyName: 'accessCode' });
        const formattedAccessCode = formData.accessCode?.replace(/\s/g, '').toUpperCase();
        req.locals.logger.info(
          `UserId: "${req.session.user.id}" - Invalid access code for case id: "${caseReference}" (form), ${
            caseData.id
          } (retrieved) with ${expectedAccessCode ? '' : 'un'}defined retrieved access code ${expectedAccessCode} : ${
            formData.accessCode
          } : ${formattedAccessCode}`
        );
      }
    } catch (err) {
      logger.error(`Error while retrieving data for case ID: "${caseReference}". Error: ${err}`);
      req.session.errors.push({ errorType: 'invalidReference', propertyName: 'caseReference' });
    }

    if (req.session.errors.length === 0) {
      const systemEvent = req.path.includes(APPLICANT_2) ? SYSTEM_LINK_APPLICANT_2 : SYSTEM_LINK_APPLICANT_1;

      logger.info(`Calling to link ${systemEvent} to case ID: ${caseReference}`);
      try {
        req.session.userCase = await caseworkerUserApi.triggerEvent(caseReference as string, formData, systemEvent);

        if (req.path.includes(APPLICANT_2)) {
          req.session.isApplicant2 = true;
        } else {
          req.session.isApplicant2 = false;
        }
      } catch (err) {
        req.locals.logger.error(`Error linking applicant/respondent to case ${caseReference}, ${err}`);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }

    if (req.session.errors.length === 0) {
      if (req.session.existingCaseId) {
        try {
          await req.locals.api.triggerEvent(req.session.existingCaseId, {}, SYSTEM_UNLINK_APPLICANT);
          req.locals.logger.info(
            `Unlinking userId: "${req.session.user.id}" from existing application: ${req.session.existingCaseId}`
          );
        } catch (err) {
          req.locals.logger.error(
            `Could not unlink user(${req.session.user.id}) from case(${req.session.existingCaseId})`
          );
          req.session.errors.push({ errorType: 'Unlinking Error', propertyName: 'SYSTEM-UNLINK-APPLICANT' });
        }
      }
      req.session.existingCaseId = req.session.userCase.id;
      req.session.applicantChoosesNewInviteCase = undefined;
    }

    let nextStep = req.url;
    if (req.session.errors.length === 0) {
      nextStep = `${HOME_URL}`;
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextStep);
    });
  }
}
