import autobindDecorator from 'autobind-decorator';

const autobind = ((autobindDecorator as { default?: unknown }).default ??
  autobindDecorator) as unknown as ClassDecorator & MethodDecorator;

import { InterimApplicationType } from '../../../../../app/case/definition';
import { AnyObject } from '../../../../../app/controller/PostController';
import StartInterimApplicationPostController from '../../common/start-interim-application/post';

@autobind
export default class DispenseServiceApplicationPostController extends StartInterimApplicationPostController<AnyObject> {
  protected interimApplicationType(): InterimApplicationType {
    return InterimApplicationType.DISPENSE_WITH_SERVICE;
  }
}
