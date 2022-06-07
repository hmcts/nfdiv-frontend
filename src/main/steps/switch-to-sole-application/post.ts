import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CaseWithId } from '../../app/case/case';
import { SWITCH_TO_SOLE, State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { AnyObject } from '../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../app/form/Form';
import { HOME_URL, PAY_AND_SUBMIT, YOUR_DETAILS_URL } from '../urls';

@autobind
export class SwitchToSoleApplicationPostController {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {}

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (req.body.cancel) {
      return res.redirect(req.session.userCase.state === State.AwaitingPayment ? PAY_AND_SUBMIT : HOME_URL);
    }

    req.session.errors = [];

    try {
      req.session.userCase = await req.locals.api.triggerEvent(req.session.userCase.id, {}, SWITCH_TO_SOLE);
    } catch (err) {
      req.locals.logger.error('Error encountered whilst switching to sole application ', err);
      req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
    }

    if (req.session.isApplicant2 && req.session.errors.length === 0) {
      req.session.userCase = undefined as unknown as CaseWithId;
      req.session.isApplicant2 = false;
    }

    const nextUrl = req.session.errors.length > 0 ? req.url : YOUR_DETAILS_URL;

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
