import autobind from 'autobind-decorator';

import { CITIZEN_NO_RESPONSE_JOURNEY } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default class CheckYourAnswersPostController extends PostController<AnyObject> {
  /**
   * Force some fields to be set in the form data so they can be used in the to-api-format converters
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getEventName(req: AppRequest<AnyObject>): string {
    return CITIZEN_NO_RESPONSE_JOURNEY;
  }
}
