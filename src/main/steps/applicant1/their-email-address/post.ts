import { CITIZEN_RESEND_INVITE } from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject, PostController } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';
import { isApplicant2EmailUpdatePossible } from '../../common/content.utils.js';

@autobind
export default class TheirEmailAddressPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    if (isApplicant2EmailUpdatePossible(req.session.userCase)) {
      return CITIZEN_RESEND_INVITE;
    } else {
      return super.getEventName(req);
    }
  }
}
