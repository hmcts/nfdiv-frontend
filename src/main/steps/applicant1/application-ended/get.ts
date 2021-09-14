import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getSystemUser } from '../../../app/auth/user/oidc';
import { getCaseApi } from '../../../app/case/CaseApi';
import { ApplicationType, CITIZEN_SWITCH_TO_SOLE } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { APPLICATION_ENDED } from '../../urls';

@autobind
export default class ApplicationEndedGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const caseworkerUser = await getSystemUser();
    req.locals.api = getCaseApi(caseworkerUser, req.locals.logger);

    try {
      req.session.userCase.applicationType = ApplicationType.SOLE_APPLICATION;
      req.session.userCase = await req.locals.api.triggerEvent(
        req.session.userCase.id,
        req.session.userCase,
        CITIZEN_SWITCH_TO_SOLE
      );
    } catch (err) {
      req.locals.logger.error('Error encountered whilst switching application type to sole ', err);
      throw err;
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(APPLICATION_ENDED);
    });
  }
}
