import { Response } from 'express';
import { Form } from '../form/Form';
import { AppRequest } from './AppRequest';
import autobind from 'autobind-decorator';
import { SessionState } from '../step/StepStateStorage';

@autobind
export abstract class PostController<T extends AnyObject> {

  constructor(
    protected readonly form: Form
  ) { }

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
        res.redirect(req.path);
      });
    } else {
      req.session.errors = undefined;

      const state = this.getStateUpdate(res.locals.storage.getCurrentState(), req.body, req.path);

      await res.locals.storage.store(state);

      res.redirect(this.getNextStep(req.body));
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

  /**
   * Get the page to redirect to
   */
  protected abstract getNextStep(body: T): string;

}

export type AnyObject = Record<string, any>;
