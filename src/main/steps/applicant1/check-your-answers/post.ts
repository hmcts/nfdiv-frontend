import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getSystemUser } from '../../../app/auth/user/oidc';
import { getCaseApi } from '../../../app/case/CaseApi';
import {
  APPLICANT_1_RESUBMIT,
  ApplicationType,
  CITIZEN_INVITE_APPLICANT_2,
  CITIZEN_SUBMIT,
  SWITCH_TO_SOLE,
  State,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class CheckYourAnswersPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (
      req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION &&
      req.session.userCase.state === State.AwaitingApplicant1Response
    ) {
      const caseworkerUser = await getSystemUser();
      const caseApi = getCaseApi(caseworkerUser, req.locals.logger);
      req.session.errors = [];

      try {
        req.session.userCase = await caseApi.triggerEvent(
          req.session.userCase.id,
          req.session.userCase,
          SWITCH_TO_SOLE
        );
      } catch (err) {
        req.locals.logger.error('Error encountered whilst switching to sole application ', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
        return res.redirect(req.url);
      }
    }
    await super.post(req, res);
  }

  protected getEventName(req: AppRequest<AnyObject>): string {
    if (
      req.body.applicationType === ApplicationType.JOINT_APPLICATION &&
      req.session.userCase.state === State.AwaitingApplicant1Response
    ) {
      return APPLICANT_1_RESUBMIT;
    } else if (req.body.applicationType === ApplicationType.JOINT_APPLICATION) {
      return CITIZEN_INVITE_APPLICANT_2;
    } else {
      return CITIZEN_SUBMIT;
    }
  }
}
