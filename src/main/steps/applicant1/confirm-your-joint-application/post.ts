import autobind from 'autobind-decorator';

import { CITIZEN_SUBMIT } from '../../../app/case/definition';
import CheckYourAnswersPostController from '../check-your-answers/post';

@autobind
export default class ConfirmYourJointApplicationPostController extends CheckYourAnswersPostController {
  protected getEventName(): string {
    return CITIZEN_SUBMIT;
  }
}
