import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps/sequence';
import { SIGN_OUT_URL } from '../../steps/urls';
import { Form } from '../form/Form';

import { AppRequest } from './AppRequest';

@autobind
export class PostController<T extends AnyObject> {
  constructor(protected readonly form: Form, protected readonly id: string) {}

  /**
   * Default handler for a POST request. Checks the body for errors, returning to the current page with errors in the
   * session if there were any. Assuming no errors, store the updated state then ask the base class which page to
   * redirect to.
   */
  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    const errors = this.form.getErrors(req.body);
    const isSaveAndSignOut = !!req.body.saveAndSignOut;

    const { saveAndSignOut, ...formData } = req.body;
    await res.locals.storage.store({ [this.id]: formData });

    let nextUrl = isSaveAndSignOut ? SIGN_OUT_URL : getNextStepUrl(req);
    if (!isSaveAndSignOut && errors.length > 0) {
      req.session.errors = errors;
      nextUrl = req.url;
    } else {
      req.session.errors = undefined;
    }

    req.session.save(() => {
      res.redirect(nextUrl);
    });
  }
}

export type AnyObject = Record<string, unknown>;
