import autobind from 'autobind-decorator';
import { Response } from 'express';
import { omit } from 'lodash';

import { RequestWithScope } from '../../modules/oidc';
import { getNextStepUrl } from '../../steps';
import { SAVE_SIGN_OUT_URL } from '../../steps/urls';
import { Form } from '../form/Form';

@autobind
export class PostController<T extends AnyObject> {
  constructor(protected readonly form: Form) {}

  /**
   * Default handler for a POST request. Checks the body for errors, returning to the current page with errors in the
   * session if there were any. Assuming no errors, store the updated state then ask the base class which page to
   * redirect to.
   */
  public async post(req: RequestWithScope<T>, res: Response): Promise<void> {
    this.form.getParsedBody(req.body);

    const errors = this.form.getErrors(req.body);
    const isSaveAndSignOut = !!req.body.saveAndSignOut;

    const { saveAndSignOut, ...formData } = req.body;
    const updatedData = omit(formData, '_csrf');
    Object.assign(req.session.userCase, updatedData);

    let nextUrl = isSaveAndSignOut ? SAVE_SIGN_OUT_URL : getNextStepUrl(req);
    if (!isSaveAndSignOut && errors.length > 0) {
      req.session.errors = errors;
      nextUrl = req.url;
    } else {
      await req.scope?.cradle.api.updateCase(req.session.userCase?.id, updatedData);
      req.session.errors = undefined;
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
