import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCaseApi } from '../../../app/case/CaseApi';
import { State, WITHDRAW_JOINT_APPLICATION } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { getNextStepUrl } from '../../index';
import { HOME_URL, PAY_AND_SUBMIT_URL } from '../../urls';

@autobind
export default class SwitchToSoleApplicationPostController {
  constructor(protected readonly form: Form) {}

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    req.locals.api = getCaseApi(req.session.user, req.locals.logger);
    req.session.errors = [];

    if (req.body.cancel) {
      return res.redirect(req.session.userCase.state === State.Applicant2Approved ? PAY_AND_SUBMIT_URL : HOME_URL);
    }

    try {
      await req.locals.api.triggerEvent(req.session.userCase.id, req.session.userCase, WITHDRAW_JOINT_APPLICATION);
    } catch (err) {
      req.locals.logger.error('Error encountered whilst switching to sole application ', err);
      req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
    }

    if (req.session.errors.length === 0) {
      try {
        req.session.userCase = await req.locals.api.getOrCreateCase(res.locals.serviceType, req.session.user);
      } catch (err) {
        req.locals.logger.error('Error creating new sole application ', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }

    const nextUrl = req.session.errors.length > 0 ? req.url : getNextStepUrl(req, req.session.userCase);

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
