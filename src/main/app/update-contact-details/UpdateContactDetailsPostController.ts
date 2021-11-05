import autobind from 'autobind-decorator';

import { getNextStepUrl } from '../../steps';
import { Case, CaseWithId } from '../case/case';
import {
  ApplicationType,
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_UPDATE,
  CITIZEN_UPDATE_CONTACT_DETAILS,
  State,
} from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';

import { reviewContactDetailsSequence } from './reviewContactDetailsSequence';

@autobind
export default class UpdateContactDetailsPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    if (req.session.userCase.state === State.Draft || req.session.userCase.state === State.AwaitingApplicant1Response) {
      return CITIZEN_UPDATE;
    } else if (req.session.userCase.state === State.AwaitingApplicant2Response) {
      return CITIZEN_APPLICANT2_UPDATE;
    } else {
      return CITIZEN_UPDATE_CONTACT_DETAILS;
    }
  }

  protected async save(req: AppRequest<AnyObject>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    return req.locals.api.triggerEvent(req.session.userCase.id, formData, eventName);
  }

  protected getNextStep(req: AppRequest<AnyObject>, formData: Partial<CaseWithId>): string {
    if (
      formData.state &&
      ![State.Draft, State.AwaitingApplicant1Response, State.AwaitingApplicant2Response].includes(formData.state)
    ) {
      return this.getCustomSequenceNextStepUrl(req, formData);
    }
    return getNextStepUrl(req, formData);
  }

  private getCustomSequenceNextStepUrl(req: AppRequest<AnyObject>, formData: Partial<CaseWithId>) {
    const sequencesForApplicant = reviewContactDetailsSequence(
      req.session.isApplicant2,
      req.session.userCase.applicationType as ApplicationType
    );
    return getNextStepUrl(req, formData, sequencesForApplicant);
  }
}
