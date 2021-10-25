import autobind from 'autobind-decorator';

import {
  CITIZEN_APPLICANT2_UPDATE,
  CITIZEN_UPDATE,
  CITIZEN_UPDATE_CONTACT_DETAILS,
  State,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class CitizenUpdateContactDetailsPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    if (req.session.userCase.state === State.Draft || req.session.userCase.state === State.AwaitingApplicant1Response) {
      return CITIZEN_UPDATE;
    } else if (req.session.userCase.state === State.AwaitingApplicant2Response) {
      return CITIZEN_APPLICANT2_UPDATE;
    } else {
      return CITIZEN_UPDATE_CONTACT_DETAILS;
    }
  }
}
