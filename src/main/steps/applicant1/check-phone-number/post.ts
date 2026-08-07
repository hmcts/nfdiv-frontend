import {
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_APPLICANT2_UPDATE_CONTACT_DETAILS,
  CITIZEN_UPDATE,
  CITIZEN_UPDATE_CONTACT_DETAILS,
  State,
} from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject, PostController } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';

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
}
