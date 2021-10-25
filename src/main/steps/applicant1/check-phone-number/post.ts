import autobind from 'autobind-decorator';

import { CITIZEN_UPDATE_CONTACT_DETAILS } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class CitizenUpdateContactDetailsPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return CITIZEN_UPDATE_CONTACT_DETAILS;
  }
}
