import { InterimApplicationType } from '../../../../../app/case/definition.js';
import { AnyObject } from '../../../../../app/controller/PostController.js';
import autobind from '../../../../../app/utils/autobind.js';
import StartInterimApplicationPostController from '../../common/start-interim-application/post.js';

@autobind
export default class DispenseServiceApplicationPostController extends StartInterimApplicationPostController<AnyObject> {
  protected interimApplicationType(): InterimApplicationType {
    return InterimApplicationType.DISPENSE_WITH_SERVICE;
  }
}
