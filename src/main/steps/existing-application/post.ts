import autobind from 'autobind-decorator';
import { Response } from 'express';
import { isEmpty } from 'lodash';

import { getSystemUser } from '../../app/auth/user/oidc';
import { CaseWithId } from '../../app/case/case';
import { CaseApi, getCaseApi } from '../../app/case/case-api';
import { ApplicationType, SYSTEM_CANCEL_CASE_INVITE, State, UserRole } from '../../app/case/definition';
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
          const caseworkerUserApi = getCaseApi(await getSystemUser(), req.locals.logger);
          const existingCase = await caseworkerUserApi.getCaseById(req.session.existingCaseId);

          if (formData.existingOrNewApplication === existingOrNew.Existing) {
            req.locals.logger.info(
              `UserId: ${req.session.user.id} has chosen to continue with existing application: ${req.session.existingCaseId}
                    and cancelling case invite: ${req.session.inviteCaseId}`
            );
            await caseworkerUserApi.triggerEvent(req.session.inviteCaseId, {}, SYSTEM_CANCEL_CASE_INVITE);

            req.session.userCase = existingCase;
            req.session.isApplicant2 = await caseworkerUserApi.isApplicant2(
              req.session.userCase.id,
              req.session.user.id
            );
            nextUrl = HOME_URL;
          } else if (formData.existingOrNewApplication === existingOrNew.New) {
            if (await this.isAllowedToUnlinkFromCase(existingCase, caseworkerUserApi, req.session.user.id)) {
              req.session.applicantChoosesNewInviteCase = true;
              nextUrl = `${APPLICANT_2}${ENTER_YOUR_ACCESS_CODE}`;
            } else {
              req.locals.logger.info(
                `UserId: ${req.session.user.id} not allowed to link to case ${req.session.inviteCaseId}
                      so invite will be cancelled`
              );
              await caseworkerUserApi.triggerEvent(req.session.inviteCaseId, {}, SYSTEM_CANCEL_CASE_INVITE);
              req.session.cannotLinkToNewCase = true;
              req.session.existingApplicationType = existingCase.applicationType;
              nextUrl = req.url;
            }
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

  private async isAllowedToUnlinkFromCase(
    existingUserCase: CaseWithId,
    caseworkerUserApi: CaseApi,
    userId: string
  ): Promise<boolean> {
    if (ApplicationType.SOLE_APPLICATION === existingUserCase.applicationType) {
      const currentUsersRoleOnExistingCase = await caseworkerUserApi.getUsersRoleOnCase(existingUserCase.id, userId);
      if (currentUsersRoleOnExistingCase === UserRole.APPLICANT_2) {
        const postSubmission = State.Submitted !== existingUserCase.state && !isEmpty(existingUserCase.dateSubmitted);
        return postSubmission && isEmpty(existingUserCase.dateAosSubmitted);
      } else if (currentUsersRoleOnExistingCase === UserRole.CREATOR) {
        return isEmpty(existingUserCase.dateSubmitted);
      } else {
        throw new Error('User is neither CREATOR or APPLICANT_2 on the existing case.');
      }
    } else {
      return isEmpty(existingUserCase.dateSubmitted);
    }
  }
}
