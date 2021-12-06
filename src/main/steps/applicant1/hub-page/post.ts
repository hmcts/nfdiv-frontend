import autobind from 'autobind-decorator';
import { Response } from 'express';

import {
  APPLICANT_1_CONFIRM_RECEIPT,
  DRAFT_CONDITIONAL_ORDER,
  State,
  UPDATE_CONDITIONAL_ORDER,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields } from '../../../app/form/Form';
import { CONTINUE_WITH_CONDITIONAL_ORDER } from '../../urls';

@autobind
export default class HubPagePostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const conditionalOrderStates = [
      State.AwaitingConditionalOrder,
      State.ConditionalOrderDrafted,
      State.AwaitingLegalAdvisorReferral,
    ];

    const fields = this.fields;
    const form = new Form(<FormFields>fields);

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length === 0) {
      try {
        req.session.userCase = await this.save(req, formData, this.getEventName(req));
      } catch (err) {
        req.locals.logger.error('Error saving', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }

    const nextUrl =
      req.session.errors.length === 0 && conditionalOrderStates.includes(req.session.userCase.state)
        ? CONTINUE_WITH_CONDITIONAL_ORDER
        : req.url;

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }

  protected getEventName(req: AppRequest): string {
    if (req.session.userCase.state === State.Holding) {
      return APPLICANT_1_CONFIRM_RECEIPT;
    } else if (req.session.userCase.state === State.AwaitingConditionalOrder) {
      return DRAFT_CONDITIONAL_ORDER;
    } else {
      return UPDATE_CONDITIONAL_ORDER;
    }
  }
}
