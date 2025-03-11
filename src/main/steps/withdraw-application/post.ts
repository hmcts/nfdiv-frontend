import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CITIZEN_WITHDRAW } from '../../app/case/definition';
import { APPLICATION_WITHDRAWN } from '../urls';
import { AppRequest } from '../..//app/controller/AppRequest';
import { AnyObject, PostController } from '../../app/controller/PostController';

const logger = Logger.getLogger('withdraw-application-controller');

@autobind
export class WithdrawApplicationPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      await super.save(req, {}, CITIZEN_WITHDRAW);
    } catch (err) {
      logger.error(`Failed to withdraw citizen case: ${req.session.userCase.caseReference}, error: ${err}`);

      throw new Error('Failed to withdraw case. Please try again later.');
    }

    req.session.destroy(err => {
      if (err) {
        throw err;
      }

      res.redirect(APPLICATION_WITHDRAWN);
    });
  }
  

  protected getEventName(): string {
    return CITIZEN_WITHDRAW;
  }
}
