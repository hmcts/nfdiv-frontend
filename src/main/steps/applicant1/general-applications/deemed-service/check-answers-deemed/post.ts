import autobind from 'autobind-decorator';

import {
  CITIZEN_SERVICE_APPLICATION,
} from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default class CheckYourAnswersPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
      return CITIZEN_SERVICE_APPLICATION;
  }
}
