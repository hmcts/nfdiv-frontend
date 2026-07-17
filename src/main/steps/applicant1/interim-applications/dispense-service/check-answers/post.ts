import { CITIZEN_SERVICE_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition';
import autobind from '../../../../../app/utils/autobind';
import { Step } from '../../../../../steps/applicant1Sequence';
import { dispenseServiceApplicationSequence } from '../../../../dispenseServiceApplicationSequence';
import CheckAnswersPostController from '../../common/check-answers/post';

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
