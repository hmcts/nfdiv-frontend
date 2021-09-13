import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCaseApi } from '../../../app/case/CaseApi';
import { CITIZEN_SWITCH_TO_SOLE } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { APPLICATION_ENDED } from '../../urls';

@autobind
export default class ApplicationEndedGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    req.locals.api = getCaseApi(req.session.user, req.locals.logger);

    try {
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
