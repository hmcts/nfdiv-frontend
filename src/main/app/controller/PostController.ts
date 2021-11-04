import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import { SAVE_AND_SIGN_OUT } from '../../steps/urls';
import { getUnreachableAnswersAsNull } from '../case/answers/possibleAnswers';
import { Case, CaseWithId } from '../case/case';
import {
  ApplicationType,
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_SAVE_AND_CLOSE,
  CITIZEN_UPDATE,
  UPDATE_AOS,
} from '../case/definition';
import { Form } from '../form/Form';

import { AppRequest } from './AppRequest';

@autobind
export class PostController<T extends AnyObject> {
  constructor(protected readonly form: Form) {}

  /**
   * Parse the form body and decide whether this is a save and sign out, save and continue or session time out
   */
  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    this.form.setFormState(req.session.userCase);
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
      await this.save(req, formData, CITIZEN_SAVE_AND_CLOSE);
    } catch {
      // ignore
    }
    res.redirect(SAVE_AND_SIGN_OUT);
  }

  private async saveBeforeSessionTimeout(req: AppRequest<T>, res: Response, formData: Partial<Case>): Promise<void> {
    try {
      await this.save(req, formData, this.getEventName(req));
    } catch {
      // ignore
    }
    res.end();
  }

  private async saveAndContinue(req: AppRequest<T>, res: Response, formData: Partial<Case>): Promise<void> {
    Object.assign(req.session.userCase, formData);
    this.form.setFormState(req.session.userCase);
    req.session.errors = this.form.getErrors(formData);

    if (req.session.errors.length === 0) {
      try {
        req.session.userCase = await this.save(req, formData, this.getEventName(req));
      } catch (err) {
        req.locals.logger.error('Error saving', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }

    const nextUrl = req.session.errors.length > 0 ? req.url : this.getNextStep(req, req.session.userCase);

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(nextUrl);
    });
  }

  protected getNextStep(req: AppRequest<T>, formData: Partial<CaseWithId>): string {
    return getNextStepUrl(req, formData);
  }

  protected async save(req: AppRequest<T>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    const unreachableAnswersAsNull = getUnreachableAnswersAsNull(req.session.userCase);
    const dataToSave = {
      ...unreachableAnswersAsNull,
      ...formData,
    };

    return req.locals.api.triggerEvent(req.session.userCase.id, dataToSave, eventName);
  }

  protected getEventName(req: AppRequest<T>): string {
    if (req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION && req.session.isApplicant2) {
      return UPDATE_AOS;
    } else if (req.session.isApplicant2) {
      return CITIZEN_APPLICANT2_UPDATE;
    } else {
      return CITIZEN_UPDATE;
    }
  }
}

export type AnyObject = Record<string, unknown>;
