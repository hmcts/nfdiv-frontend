import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { WITHDRAW_D11_APPLICATION } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

const logger = Logger.getLogger('withdraw-service-application-controller');

@autobind
export default class WithdrawD11ApplicationPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      req.session.userCase = await super.save(req, {}, WITHDRAW_D11_APPLICATION);
    } catch (err) {
      logger.error(
        `Failed to withdraw d11 general application for case: ${req.session.userCase.caseReference}, error: ${err}`
      );

      throw new Error('Failed to withdraw d11 general application. Please try again later.');
    }

    this.saveSessionAndRedirect(req, res);
  }
}
