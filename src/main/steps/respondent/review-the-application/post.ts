import autobind from 'autobind-decorator';

import { Checkbox } from '../../../app/case/case';
import { DRAFT_AOS, UPDATE_AOS } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class ReviewTheApplicationPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    if (req.session.userCase.confirmReadPetition === Checkbox.Checked) {
      return UPDATE_AOS;
    }
    return DRAFT_AOS;
  }
}
