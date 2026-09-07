import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case, CaseWithId } from '../../../app/case/case';
import {
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_APPLICANT2_UPDATE_CONTACT_DETAILS,
  CITIZEN_UPDATE,
  CITIZEN_UPDATE_CONTACT_DETAILS,
  State,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';

@autobind
export default class CitizenUpdateContactDetailsPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    if (req.session.userCase.state === State.Draft || req.session.userCase.state === State.AwaitingApplicant1Response) {
      return CITIZEN_UPDATE;
    } else if (req.session.userCase.state === State.AwaitingApplicant2Response) {
      return CITIZEN_APPLICANT2_UPDATE;
    } else {
      return req.session.isApplicant2 ? CITIZEN_APPLICANT2_UPDATE_CONTACT_DETAILS : CITIZEN_UPDATE_CONTACT_DETAILS;
    }
  }

  protected async saveAndContinue(
    req: AppRequest<AnyObject>,
    res: Response,
    form: Form,
    formData: Partial<Case>
  ): Promise<void> {
    const fieldValueChanged = this.hasValueChanged(formData, req.session.userCase);

    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length === 0) {
      try {
        if (fieldValueChanged) {
          req.session.userCase = await this.save(req, formData, this.getEventName(req));
        }
      } catch (err) {
        req.locals.logger.error('Error saving', err);
        req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
      }
    }

    this.saveSessionAndRedirect(req, res);
  }

  private hasValueChanged(formData: Partial<Case>, userCase: CaseWithId): boolean {
    return Object.keys(formData).some(key => this.normalizeValue(formData[key]) !== this.normalizeValue(userCase[key]));
  }

  private normalizeValue(value: string | number | boolean | string[] | object | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (Array.isArray(value)) {
      return value
        .map(item => String(item).toLowerCase().trim())
        .sort()
        .join(',');
    }

    if (typeof value === 'object') {
      return JSON.stringify(value, Object.keys(value).sort());
    }

    return String(value).toLowerCase().replace(/\s+/g, ' ').trim();
  }
}
