import autobind from 'autobind-decorator';
import { Response } from 'express';

import { SWITCH_TO_SOLE, SWITCH_TO_SOLE_CO, State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { currentStateFn } from '../../state-sequence';
import { HUB_PAGE } from '../../urls';

@autobind
export default class ChangingToASoleApplicationPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    req.session.errors = [];
    try {
      const displayState = currentStateFn(req.session.userCase.state);
      const eventName = displayState.isBefore(State.AwaitingFinalOrder) ? SWITCH_TO_SOLE_CO : SWITCH_TO_SOLE;
      req.session.userCase = await req.locals.api.triggerEvent(req.session.userCase.id, {}, eventName);
    } catch (err) {
      req.locals.logger.error('Error encountered whilst switching to sole application ', err);
      req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
    }

    if (req.session.isApplicant2 && req.session.errors.length === 0) {
      req.session.isApplicant2 = false;
    }
    req.session.existingCaseId = req.session.userCase.id;

    const nextUrl = req.session.errors.length > 0 ? req.url : HUB_PAGE;

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}
