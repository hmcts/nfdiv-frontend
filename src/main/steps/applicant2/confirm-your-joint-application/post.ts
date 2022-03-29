import autobind from 'autobind-decorator';

import { APPLICANT_2_APPROVE } from '../../../app/case/definition';
import Applicant2PrayerPostController from '../check-your-answers/post';

@autobind
export default class ConfirmYourJointApplicationPostController extends Applicant2PrayerPostController {
  protected getEventName(): string {
    return APPLICANT_2_APPROVE;
  }
}
