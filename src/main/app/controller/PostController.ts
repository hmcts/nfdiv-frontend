import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps/sequence';
import { Form } from '../form/Form';
import { SessionState } from '../step/StepStateStorage';

import { AppRequest } from './AppRequest';

@autobind
export class PostController<T extends AnyObject> {
  constructor(protected readonly form: Form) {}

  /**
   * Default handler for a POST request. Checks the body for errors, returning to the current page with errors in the
   * session if there were any. Assuming no errors, store the updated state then ask the base class which page to
   * redirect to.
   */
  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    const errors = this.form.getErrors(req.body);

    if (errors.length > 0) {
      req.session.errors = errors;
      req.session.save(() => {
        res.redirect(req.url);
      });
    } else {
      req.session.errors = undefined;

      const state = this.getStateUpdate(res.locals.storage.getCurrentState(), req.body, req.path);

      await res.locals.storage.store(state);

      res.redirect(getNextStepUrl(req, req.body as Record<string, string>));
    }
  }

  /**
   * Apply the given state to the existing state and return an update. By default the update will be returned so it can
   * be persisted in the session state storage. If updating this steps state has any side effects (such as removing
   * the state of other steps) then the base class should overwrite this method and add further changes.
   */
  protected getStateUpdate(current: SessionState, update: T, stepName: string): AnyObject {
    return { [stepName]: update };
  }
}

export type AnyObject = Record<string, unknown>;
