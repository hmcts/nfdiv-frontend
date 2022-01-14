import autobind from 'autobind-decorator';

import { APPLICANT_2_REQUEST_CHANGES, CITIZEN_APPLICANT2_UPDATE, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';

@autobind
export default class CheckYourJointApplicationPostController extends PostController<AnyObject> {
  protected getEventName(req: AppRequest<AnyObject>): string {
    return req.body.applicant2Confirmation === YesOrNo.NO ? APPLICANT_2_REQUEST_CHANGES : CITIZEN_APPLICANT2_UPDATE;
  }
}
