import autobind from 'autobind-decorator';

import { Checkbox } from '../../../app/case/case';
import { DRAFT_AOS, UPDATE_AOS } from '../../../app/case/definition';
import { AppRequest, AppSession } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class ReviewTheApplicationPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>, preSubmissionSession: AppSession): string {
    if (preSubmissionSession.userCase.confirmReadPetition === Checkbox.Checked) {
      return UPDATE_AOS;
    }
    return DRAFT_AOS;
  }
}
