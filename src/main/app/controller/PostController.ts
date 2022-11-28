import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import { SAVE_AND_SIGN_OUT } from '../../steps/urls';
import { Case, CaseWithId } from '../case/case';
import { CITIZEN_APPLICANT2_UPDATE, CITIZEN_SAVE_AND_CLOSE, CITIZEN_UPDATE } from '../case/definition';
import { Form, FormFields, FormFieldsFn } from '../form/Form';

import { AppRequest } from './AppRequest';

@autobind
export class PostController<T extends AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {}

  /**
   * Parse the form body and decide whether this is a save and sign out, save and continue or session time out
   */
  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    if (req.body.saveAndSignOut || req.body.saveBeforeSessionTimeout) {
      await this.saveAndSignOut(req, res, form, formData);
    } else {
      await this.saveAndContinue(req, res, form, formData);
    }
  }

  protected async saveAndSignOut(
    req: AppRequest<T>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);

    formData = req.session.errors.length === 0 ? formData : {};
    try {
      await this.save(req, formData, CITIZEN_SAVE_AND_CLOSE);
    } catch {
      // ignore
    }
    res.redirect(SAVE_AND_SIGN_OUT);
  }

  protected getNextUrl(req: AppRequest): string {
    return req.session.errors !== undefined && req.session.errors.length > 0
      ? req.url
      : getNextStepUrl(req, req.session.userCase);
  }

  protected async saveAndContinue(
    req: AppRequest<T>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length === 0) {
      try {
        req.session.userCase = await this.save(req, formData, this.getEventName(req));
      } catch (err) {
        req.locals.logger.error('Error saving', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }

    const nextUrl = this.getNextUrl(req);

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }

  protected async save(req: AppRequest<T>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    return req.locals.api.triggerEvent(req.session.userCase.id, formData, eventName);
  }

  protected getEventName(req: AppRequest<T>): string {
    if (req.session.isApplicant2) {
      return CITIZEN_APPLICANT2_UPDATE;
    } else {
      return CITIZEN_UPDATE;
    }
  }
}

export type AnyObject = Record<string, unknown>;
