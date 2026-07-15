import autobindDecorator from 'autobind-decorator';

const autobind = ((autobindDecorator as { default?: unknown }).default ??
  autobindDecorator) as unknown as ClassDecorator & MethodDecorator;

import { INTEND_SWITCH_TO_SOLE_FO } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class HowToFinalisePostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return INTEND_SWITCH_TO_SOLE_FO;
  }
}
