import { SUBMIT_CLARIFICATION } from '../../../app/case/definition.js';
import { AnyObject, PostController } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';

@autobind
export default class ProvideInformationToTheCourtPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return SUBMIT_CLARIFICATION;
  }
}
