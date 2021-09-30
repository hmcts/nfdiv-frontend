import autobind from 'autobind-decorator';

import { CITIZEN_DRAFT_AOS } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class ReviewTheApplicationPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return CITIZEN_DRAFT_AOS;
  }
}
