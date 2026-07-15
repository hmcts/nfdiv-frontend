import autobindDecorator from 'autobind-decorator';

const autobind = ((autobindDecorator as { default?: unknown }).default ??
  autobindDecorator) as unknown as ClassDecorator & MethodDecorator;

import { APPLICANT_2_NOT_BROKEN } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class Applicant2IrretrievableBreakdownPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return APPLICANT_2_NOT_BROKEN;
  }
}
