import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import {
  APPLICANT_1,
  APPLICANT_2,
  HUB_PAGE,
  RESPONDENT,
  SIGN_OUT_URL,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION
} from '../../steps/urls';
import { getSystemUser } from '../auth/user/oidc';
import { getCaseApi } from '../case/case-api';
import {
  ApplicationType,
  SYSTEM_LINK_APPLICANT_1,
  SYSTEM_LINK_APPLICANT_2,
  SYSTEM_UNLINK_APPLICANT
} from '../case/definition';
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

    formData.respondentUserId = req.session.user.id;

    //ToDo: confirm setting the first and last names from session is
    //how it should work, we were doing this on joint application previously
    //but oddly not on respondent
    if (req.path.includes(APPLICANT_2)) {
      formData.applicant2Email = req.session.user.email;
      formData.applicant2FirstNames = req.session.user.givenName;
      formData.applicant2LastNames = req.session.user.familyName;
    } else {
      formData.applicant1Email = req.session.user.email;
      formData.applicant1FirstNames = req.session.user.givenName;
      formData.applicant1LastNames = req.session.user.familyName;
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
          } (retrieved) with ${caseData.accessCode ? '' : 'un'}defined retrieved access code ${caseData.accessCode} : ${
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

      logger.info('Calling to link "$systemEvent" to case ID: ' + caseReference);
      try {
        req.session.userCase = await caseworkerUserApi.triggerEvent(caseReference as string, formData, systemEvent);

        if (req.path.includes(APPLICANT_2)) {
          req.session.isApplicant2 = true;
        }
      } catch (err) {
        req.locals.logger.error(
          `Error linking applicant/respondent to case ${caseReference}, ${err}`
        );
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
      if (req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION) {
        if (req.session.isApplicant2) {
          nextStep = `${RESPONDENT}${HUB_PAGE}`;
        } else {
          nextStep = `${APPLICANT_1}${HUB_PAGE}`;
        }
      } else if (req.session.userCase.applicationType === ApplicationType.JOINT_APPLICATION) {
        if (req.session.isApplicant2) {
          nextStep = `${APPLICANT_2}${YOU_NEED_TO_REVIEW_YOUR_APPLICATION}`;
        } else {
          nextStep = `${APPLICANT_1}${YOU_NEED_TO_REVIEW_YOUR_APPLICATION}`;
        }
      }
    }
    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextStep);
    });
  }
}
