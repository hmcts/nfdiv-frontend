import autobind from 'autobind-decorator';

import { CITIZEN_RESEND_INVITE, CITIZEN_UPDATE } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { isApplicant2EmailUpdatePossible } from '../../common/content.utils';

@autobind
export default class TheirEmailAddressPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    if (isApplicant2EmailUpdatePossible(req.session.userCase)) {
      return CITIZEN_RESEND_INVITE;
    } else {
      return CITIZEN_UPDATE;
    }
  }
}
