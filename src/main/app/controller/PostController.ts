import autobind from 'autobind-decorator';
import { NextFunction, Response } from 'express';

import { getNextStepUrl } from '../../steps';
import { SAVE_AND_SIGN_OUT } from '../../steps/urls';
import { getUnreachableAnswersAsNull } from '../case/answers/possibleAnswers';
import { Case, CaseWithId, Checkbox } from '../case/case';
import { CITIZEN_APPLICANT2_UPDATE, CITIZEN_SAVE_AND_CLOSE, CITIZEN_UPDATE } from '../case/definition';
import { Form } from '../form/Form';

import { AppRequest } from './AppRequest';

@autobind
export class PostController<T extends AnyObject> {
  constructor(protected readonly form: Form) {}

  /**
   * Parse the form body and decide whether this is a save and sign out, save and continue or session time out
   */
  public async post(
    req: AppRequest<T>,
    res: Response,
    next?: NextFunction,
    eventName: string = req.session.isApplicant2 ? CITIZEN_APPLICANT2_UPDATE : CITIZEN_UPDATE
  ): Promise<void> {
    this.form.setFormState(req.session.userCase);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = this.form.getParsedBody(req.body);

    // Reset users pray/application truth when changing other questions
    const stepData = {
      iConfirmPrayer: Checkbox.Unchecked,
      iBelieveApplicationIsTrue: Checkbox.Unchecked,
      ...formData,
    };

    if (req.body.saveAndSignOut) {
      await this.saveAndSignOut(req, res, stepData);
    } else if (req.body.saveBeforeSessionTimeout) {
      await this.saveBeforeSessionTimeout(req, res, stepData);
    } else {
      await this.saveAndContinue(req, res, stepData, eventName);
    }
  }

  private async saveAndSignOut(req: AppRequest<T>, res: Response, formData: Partial<Case>): Promise<void> {
    try {
      await this.save(req, formData, CITIZEN_SAVE_AND_CLOSE);
    } catch {
      // ignore
    }
    res.redirect(SAVE_AND_SIGN_OUT);
  }

  private async saveBeforeSessionTimeout(req: AppRequest<T>, res: Response, formData: Partial<Case>): Promise<void> {
    try {
      await this.save(req, formData, CITIZEN_UPDATE);
    } catch {
      // ignore
    }
    res.end();
  }

  private async saveAndContinue(
    req: AppRequest<T>,
    res: Response,
    formData: Partial<Case>,
    eventName: string
  ): Promise<void> {
    Object.assign(req.session.userCase, formData);
    this.form.setFormState(req.session.userCase);
    req.session.errors = this.form.getErrors(formData);

    if (req.session.errors.length === 0) {
      try {
        req.session.userCase = await this.save(req, formData, eventName);
      } catch (err) {
        req.locals.logger.error('Error saving', err);
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

  protected async save(req: AppRequest<T>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    const unreachableAnswersAsNull = getUnreachableAnswersAsNull(req.session.userCase);
    const dataToSave = { ...unreachableAnswersAsNull, ...formData };

    return req.locals.api.triggerEvent(req.session.userCase.id, dataToSave, eventName);
  }
}

export type AnyObject = Record<string, unknown>;
