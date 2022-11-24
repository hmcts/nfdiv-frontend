import autobind from 'autobind-decorator';

import { INTEND_SWITCH_TO_SOLE_FO } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class HowToFinalisePostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return INTEND_SWITCH_TO_SOLE_FO;
  }
}
