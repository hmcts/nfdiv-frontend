import autobind from 'autobind-decorator';

import { CITIZEN_SERVICE_APPLICATION } from '../../../../../app/case/definition';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default class CheckYourAnswersPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return CITIZEN_SERVICE_APPLICATION;
  }
}
