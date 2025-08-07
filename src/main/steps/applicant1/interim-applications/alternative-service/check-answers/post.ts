import autobind from 'autobind-decorator';

import { CITIZEN_SERVICE_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition';
import { Step } from '../../../../../steps/applicant1Sequence';
import { alternativeServiceApplicationSequence as alternativeServiceSequence } from '../../../../alternativeServiceApplicationSequence';
import CheckAnswersPostController from '../../common/check-answers/post';

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
