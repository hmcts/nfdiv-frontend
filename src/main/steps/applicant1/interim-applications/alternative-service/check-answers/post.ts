import { CITIZEN_SERVICE_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition.js';
import autobind from '../../../../../app/utils/autobind.js';
import { Step } from '../../../../../steps/applicant1Sequence.js';
import { alternativeServiceApplicationSequence as alternativeServiceSequence } from '../../../../alternativeServiceApplicationSequence.js';
import CheckAnswersPostController from '../../common/check-answers/post.js';

@autobind
export default class CheckAltServiceAnswersPostController extends CheckAnswersPostController {
  protected getEventName(): string {
    return CITIZEN_SERVICE_APPLICATION;
  }

  protected interimApplicationType(): InterimApplicationType {
    return InterimApplicationType.ALTERNATIVE_SERVICE;
  }

  protected interimApplicationSequence(): Step[] {
    return alternativeServiceSequence;
  }
}
