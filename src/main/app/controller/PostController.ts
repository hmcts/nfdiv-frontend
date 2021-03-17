import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import { addConnection } from '../../steps/jurisdiction/interstitial/connections';
import { JURISDICTION_INTERSTITIAL_URL, SAVE_AND_SIGN_OUT } from '../../steps/urls';
import { Case } from '../case/case';
import { PATCH_CASE, SAVE_AND_CLOSE } from '../case/definition';
import { Form } from '../form/Form';

import { AppRequest } from './AppRequest';

@autobind
export class PostController<T extends AnyObject> {
  constructor(protected readonly form: Form) {}

  /**
   * Parse the form body and decide whether this is a save and sign out, save and continue or session time out
   */
  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = this.form.getParsedBody(req.body);

    if (req.body.saveAndSignOut) {
      await this.saveAndSignOut(req, res, formData);
    } else if (req.body.saveBeforeSessionTimeout) {
      await this.saveBeforeSessionTimeout(req, res, formData);
    } else {
      await this.saveAndContinue(req, res, formData);
    }
  }

  private async saveAndSignOut(req: AppRequest<T>, res: Response, formData: Partial<Case>): Promise<void> {
    await req.locals.api.triggerEvent(req.session.userCase.id, formData, SAVE_AND_CLOSE);

    res.redirect(SAVE_AND_SIGN_OUT);
  }

  private async saveBeforeSessionTimeout(req: AppRequest<T>, res: Response, formData: Partial<Case>): Promise<void> {
    await req.locals.api.triggerEvent(req.session.userCase.id, formData, PATCH_CASE);

    res.end();
  }

  private async saveAndContinue(req: AppRequest<T>, res: Response, formData: Partial<Case>): Promise<void> {
    Object.assign(req.session.userCase, formData);

    const errors = this.form.getErrors(formData);
    const isSessionTimeout = !!req.body.saveBeforeSessionTimeout;
    let nextUrl: string;

    if (!isSessionTimeout && errors.length > 0) {
      req.session.errors = errors;
      nextUrl = req.url;
    } else {
      nextUrl = getNextStepUrl(req, req.session.userCase);
      if (nextUrl === JURISDICTION_INTERSTITIAL_URL) {
        const connection = addConnection(req.session.userCase);
        if (connection) {
          formData.connections?.push(connection);
          Object.assign(req.session.userCase, formData);
        }
      }
      await req.locals.api.triggerEvent(req.session.userCase.id, formData, PATCH_CASE);
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
