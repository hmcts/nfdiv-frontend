import { APPLICANT_2_REQUEST_CHANGES, CITIZEN_APPLICANT2_UPDATE, YesOrNo } from '../../../app/case/definition.js';
import { AppRequest } from '../../../app/controller/AppRequest.js';
import { AnyObject } from '../../../app/controller/PostController.js';
import autobind from '../../../app/utils/autobind.js';
import Applicant2PrayerPostController from '../check-your-answers/post.js';

@autobind
export default class CheckYourJointApplicationPostController extends Applicant2PrayerPostController {
  protected getEventName(req: AppRequest<AnyObject>): string {
    return req.body.applicant2Confirmation === YesOrNo.NO ? APPLICANT_2_REQUEST_CHANGES : CITIZEN_APPLICANT2_UPDATE;
  }
}
