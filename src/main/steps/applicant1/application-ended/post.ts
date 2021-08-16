import autobind from 'autobind-decorator';

import { SWITCHED_TO_SOLE } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class Applicant1SwitchedToSolePostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return SWITCHED_TO_SOLE;
  }
}
