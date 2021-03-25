import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import { SAVE_AND_SIGN_OUT } from '../../steps/urls';
import { getUnreachableAnswersAsNull } from '../case/answers/possibleAnswers';
import { Case, CaseWithId } from '../case/case';
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
    try {
      this.save(req, formData, SAVE_AND_CLOSE);
    } finally {
      res.redirect(SAVE_AND_SIGN_OUT);
    }
  }

  private async saveBeforeSessionTimeout(req: AppRequest<T>, res: Response, formData: Partial<Case>): Promise<void> {
    await this.save(req, formData, PATCH_CASE);

    res.end();
  }

  private async saveAndContinue(req: AppRequest<T>, res: Response, formData: Partial<Case>): Promise<void> {
    Object.assign(req.session.userCase, formData);
    req.session.errors = this.form.getErrors(formData);

    if (req.session.errors.length === 0) {
      try {
        req.session.userCase = await this.save(req, formData, PATCH_CASE);
      } catch (err) {
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

  private async save(req: AppRequest<T>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    const unreachableAnswersAsNull = getUnreachableAnswersAsNull(req.session.userCase);
    const dataToSave = { ...unreachableAnswersAsNull, ...formData };

    return req.locals.api.triggerEvent(req.session.userCase.id, dataToSave, eventName);
  }
}

export type AnyObject = Record<string, unknown>;
