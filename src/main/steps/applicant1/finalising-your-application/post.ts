import autobind from 'autobind-decorator';

import { FINAL_ORDER_REQUESTED } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class FinalisingYourApplicationPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return FINAL_ORDER_REQUESTED;
  }
}
