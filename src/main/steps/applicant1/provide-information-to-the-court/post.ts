import autobindDecorator from 'autobind-decorator';

const autobind = ((autobindDecorator as { default?: unknown }).default ??
  autobindDecorator) as unknown as ClassDecorator & MethodDecorator;

import { SUBMIT_CLARIFICATION } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class ProvideInformationToTheCourtPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return SUBMIT_CLARIFICATION;
  }
}
