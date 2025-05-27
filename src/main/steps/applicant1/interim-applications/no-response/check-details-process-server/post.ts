import autobind from 'autobind-decorator';

import { APPLICANT1_RESEND_PAPERS } from '../../../../../app/case/definition';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';

@autobind
export default class CheckDetailsProcessServerPostController extends PostController<AnyObject> {
  protected getEventName(): string {
    return APPLICANT1_RESEND_PAPERS;
  };
}
