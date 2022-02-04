import autobind from 'autobind-decorator';

import { SUBMIT_CLARIFICATION } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class ProvideInformationToTheCourtPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return SUBMIT_CLARIFICATION;
  }
}
