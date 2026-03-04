import autobind from 'autobind-decorator';

import { CITIZEN_GENERAL_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition';
import { Step } from '../../../../../steps/applicant1Sequence';
import { generalApplicationD11Sequence } from '../../../../generalApplicationD11Sequence';
import CheckAnswersPostController from '../../common/check-answers/post';

@autobind
export default class CheckGeneralApplicationD11AnswersPostController extends CheckAnswersPostController {
  protected getEventName(): string {
    return CITIZEN_GENERAL_APPLICATION;
  }

  protected interimApplicationType(): InterimApplicationType {
    return InterimApplicationType.DIGITISED_GENERAL_APPLICATION_D11;
  }

  protected interimApplicationSequence(): Step[] {
    return generalApplicationD11Sequence;
  }
}
