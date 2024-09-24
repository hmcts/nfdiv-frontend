import autobind from 'autobind-decorator';

import { RESPOND_TO_REQUEST_FOR_INFORMATION } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class RespondToTheCourtsFeedbackPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return RESPOND_TO_REQUEST_FOR_INFORMATION;
  }
}
