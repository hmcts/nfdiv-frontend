import autobind from 'autobind-decorator';

import { CITIZEN_SERVICE_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition';
import { Step } from '../../../../../steps/applicant1Sequence';
import { deemedServiceApplicationSequence as deemedServiceSequence } from '../../../../deemedServiceApplicationSequence';
import CheckAnswersPostController from '../../common/check-answers/post';

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
