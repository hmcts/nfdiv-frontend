import { APPLICANT_2_NOT_BROKEN } from '../../../app/case/definition.js';
import { AnyObject, PostController } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';

@autobind
export default class Applicant2IrretrievableBreakdownPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return APPLICANT_2_NOT_BROKEN;
  }
}
