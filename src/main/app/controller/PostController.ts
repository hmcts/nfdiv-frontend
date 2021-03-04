import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import { Form } from '../form/Form';

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
    const { saveAndSignOut, _csrf, ...formData } = this.form.getParsedBody(req.body);

    Object.assign(req.session.userCase, formData);

    const errors = this.form.getErrors(formData);
    const isSaveAndSignOut = !!req.body.saveAndSignOut;
    let nextUrl: string;
    if (!isSaveAndSignOut && errors.length > 0) {
      req.session.errors = errors;
      nextUrl = req.url;
    } else {
      await req.locals.api.updateCase(req.session.userCase?.id, formData);
      if (isSaveAndSignOut) {
        return;
      }
      req.session.errors = undefined;
      nextUrl = getNextStepUrl(req, formData);
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }
}

export type AnyObject = Record<string, unknown>;
