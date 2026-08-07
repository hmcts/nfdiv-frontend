import { Logger } from '@hmcts/nodejs-logging';
import { Response } from 'express';

import { Case } from '../../../../app/case/case.js';
import { CITIZEN_WITHDRAWN } from '../../../../app/case/definition.js';
import { AppRequest } from '../../../../app/controller/AppRequest.js';
import { AnyObject, PostController } from '../../../../app/controller/PostController.js';
import { destroySessionAndRedirectToSignOutPage } from '../../../../app/controller/signout.js';
import { Form } from '../../../../app/form/Form.js';
import autobind from '../../../../app/utils/autobind.js';
import { WITHDRAW_CONFIRMATION } from '../../../../steps/urls.js';

const logger = Logger.getLogger('withdraw-application-controller');

@autobind
export default class PreIssueWithdrawPostController extends PostController<AnyObject> {
  protected async saveAndContinue(
    req: AppRequest<AnyObject>,
    res: Response,
    _form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    try {
      await super.save(req, formData, this.getEventName());
    } catch (err) {
      logger.error(`Failed to withdraw citizen case: ${req.session.userCase.caseReference}, error: ${err}`);

      throw new Error('Failed to withdraw case. Please try again later.');
    }

    destroySessionAndRedirectToSignOutPage(req, res, WITHDRAW_CONFIRMATION);
  }

  protected getEventName(): string {
    return CITIZEN_WITHDRAWN;
  }
}
