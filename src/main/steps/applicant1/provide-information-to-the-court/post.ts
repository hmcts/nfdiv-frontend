import { SUBMIT_CLARIFICATION } from '../../../app/case/definition';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import autobind from '../../../app/utils/autobind';

@autobind
export default class ProvideInformationToTheCourtPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return SUBMIT_CLARIFICATION;
  }
}
