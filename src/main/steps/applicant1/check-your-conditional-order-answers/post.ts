import autobind from 'autobind-decorator';

import { SUBMIT_CONDITIONAL_ORDER } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class CheckYourConditionalOrderAnswersPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return SUBMIT_CONDITIONAL_ORDER;
  }
}
