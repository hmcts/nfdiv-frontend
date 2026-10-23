import { INTEND_SWITCH_TO_SOLE_FO } from '../../../app/case/definition.js';
import { AnyObject, PostController } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';

@autobind
export default class HowToFinalisePostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return INTEND_SWITCH_TO_SOLE_FO;
  }
}
