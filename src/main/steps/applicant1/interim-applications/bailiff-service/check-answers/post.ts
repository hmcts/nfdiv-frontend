import autobind from 'autobind-decorator';

import { CITIZEN_SERVICE_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition';
import { Step } from '../../../../../steps/applicant1Sequence';
import { bailiffServiceApplicationSequence as bailiffServiceSequence } from '../../../../bailiffServiceApplicationSequence';
import CheckAnswersPostController from '../../common/check-answers/post';

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
