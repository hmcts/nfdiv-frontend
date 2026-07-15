import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { endIdamSessionUrl } from '../../../../app/auth/user/oidc';
import { Case } from '../../../../app/case/case';
import { CITIZEN_WITHDRAWN } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { getServiceUrl } from '../../../../app/controller/url';
import { Form } from '../../../../app/form/Form';

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

    const withdrawConfirmationPath = req.path.replace('check-your-answers', 'application-withdrawn');

    req.session.destroy(err => {
      if (err) {
        throw err;
      }

      res.redirect(endIdamSessionUrl(getServiceUrl(req, res, withdrawConfirmationPath)));
    });
  }

  protected getEventName(): string {
    return CITIZEN_WITHDRAWN;
  }
}
