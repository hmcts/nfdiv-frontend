import { CITIZEN_SERVICE_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition.js';
import autobind from '../../../../../app/utils/autobind.js';
import { Step } from '../../../../../steps/applicant1Sequence.js';
import { deemedServiceApplicationSequence as deemedServiceSequence } from '../../../../deemedServiceApplicationSequence.js';
import CheckAnswersPostController from '../../common/check-answers/post.js';

@autobind
export default class CheckDeemedServiceAnswersPostController extends CheckAnswersPostController {
  protected getEventName(): string {
    return CITIZEN_SERVICE_APPLICATION;
  }

  protected interimApplicationType(): InterimApplicationType {
    return InterimApplicationType.DEEMED_SERVICE;
  }

  protected interimApplicationSequence(): Step[] {
    return deemedServiceSequence;
  }
}
