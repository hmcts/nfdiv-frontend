import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { WITHDRAW_SERVICE_APPLICATION } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { SERVICE_APPLICATION_WITHDRAWN } from '../../../urls';

const logger = Logger.getLogger('withdraw-service-application-controller');

@autobind
export default class WithdrawServiceApplicationPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      await super.save(req, {}, WITHDRAW_SERVICE_APPLICATION);
    } catch (err) {
      logger.error(
        `Failed to withdraw service application for case: ${req.session.userCase.caseReference}, error: ${err}`
      );

      throw new Error('Failed to withdraw service application. Please try again later.');
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(SERVICE_APPLICATION_WITHDRAWN);
    });
  }
}
