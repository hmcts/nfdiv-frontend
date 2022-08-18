import autobind from 'autobind-decorator';

import { FINAL_ORDER_REQUESTED, JOINT_FINAL_ORDER_REQUESTED } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class FinalisingYourApplicationPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    return req.session.isApplicant2 ? JOINT_FINAL_ORDER_REQUESTED : FINAL_ORDER_REQUESTED;
  }
}
