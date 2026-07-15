import { CITIZEN_RESEND_INVITE } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import autobind from '../../../app/utils/autobind';
import { isApplicant2EmailUpdatePossible } from '../../common/content.utils';

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
