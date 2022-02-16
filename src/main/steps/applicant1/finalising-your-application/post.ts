import autobind from 'autobind-decorator';

import { CITIZEN_FINAL_ORDER_REQUESTED } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class FinalisingYourApplicationPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return CITIZEN_FINAL_ORDER_REQUESTED;
  }
}
