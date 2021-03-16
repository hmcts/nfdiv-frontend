import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import { SAVE_AND_SIGN_OUT } from '../../steps/urls';
import { CaseApi, PATCH_CASE, SAVE_AND_CLOSE } from '../case/CaseApi';
import { getAllPossibleAnswers } from '../case/answers/possibleAnswers';
import { Case } from '../case/case';
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
      await req.locals.api.triggerEvent(
        req.session.userCase.id,
        { ...this.getAnsweredUnreachableResponsesAsNull(req), ...formData },
        PATCH_CASE
      );
      req.session.errors = undefined;
      nextUrl = getNextStepUrl(req, req.session.userCase);
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }

  private getAnsweredUnreachableResponsesAsNull(req: AppRequest<T>): Partial<Case> {
    const possibleAnswers = getAllPossibleAnswers(req.session.userCase, req.app.locals.steps);
    return Object.fromEntries(
      Object.keys(req.session.userCase)
        .filter(
          key =>
            !CaseApi.READONLY_FIELDS.includes(key) &&
            !possibleAnswers.includes(key) &&
            req.session.userCase[key] !== null
        )
        .map(key => [key, null])
    );
  }
}

export type AnyObject = Record<string, unknown>;
