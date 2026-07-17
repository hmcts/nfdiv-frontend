import { InterimApplicationType } from '../../../../../app/case/definition';
import { AnyObject } from '../../../../../app/controller/PostController';
import autobind from '../../../../../app/utils/autobind';
import StartInterimApplicationPostController from '../../common/start-interim-application/post';

@autobind
export default class BailiffServiceApplicationPostController extends StartInterimApplicationPostController<AnyObject> {
  protected interimApplicationType(): InterimApplicationType {
    return InterimApplicationType.BAILIFF_SERVICE;
  }
}
