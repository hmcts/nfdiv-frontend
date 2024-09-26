import autobind from 'autobind-decorator';

import { CITIZEN_APPLICANT2_UPDATE, RESPONDENT_APPLY_FOR_FINAL_ORDER } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class HaveYouAppliedForHelpWithFinalOrderFeesController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest): string {
    const helpWithFeesRef = req.session.userCase.applicant2FoHelpWithFeesRefNo;

    if (helpWithFeesRef && helpWithFeesRef.length > 0) {
      return RESPONDENT_APPLY_FOR_FINAL_ORDER;
    } else {
      return CITIZEN_APPLICANT2_UPDATE;
    }
  }
}
