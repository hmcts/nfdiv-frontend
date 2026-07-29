import { CITIZEN_SERVICE_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition.js';
import autobind from '../../../../../app/utils/autobind.js';
import { Step } from '../../../../../steps/applicant1Sequence.js';
import { bailiffServiceApplicationSequence as bailiffServiceSequence } from '../../../../bailiffServiceApplicationSequence.js';
import CheckAnswersPostController from '../../common/check-answers/post.js';

@autobind
export default class CheckBailiffServiceAnswersPostController extends CheckAnswersPostController {
  protected getEventName(): string {
    return CITIZEN_SERVICE_APPLICATION;
  }

  protected interimApplicationType(): InterimApplicationType {
    return InterimApplicationType.BAILIFF_SERVICE;
  }

  protected interimApplicationSequence(): Step[] {
    return bailiffServiceSequence;
  }
}
