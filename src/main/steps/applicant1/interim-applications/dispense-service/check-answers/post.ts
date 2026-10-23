import { CITIZEN_SERVICE_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition.js';
import autobind from '../../../../../app/utils/autobind.js';
import { Step } from '../../../../../steps/applicant1Sequence.js';
import { dispenseServiceApplicationSequence } from '../../../../dispenseServiceApplicationSequence.js';
import CheckAnswersPostController from '../../common/check-answers/post.js';

@autobind
export default class CheckDispenseServiceAnswersPostController extends CheckAnswersPostController {
  protected getEventName(): string {
    return CITIZEN_SERVICE_APPLICATION;
  }

  protected interimApplicationType(): InterimApplicationType {
    return InterimApplicationType.DISPENSE_WITH_SERVICE;
  }

  protected interimApplicationSequence(): Step[] {
    return dispenseServiceApplicationSequence;
  }
}
