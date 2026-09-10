import autobind from 'autobind-decorator';

import {
  CITIZEN_GENERAL_APPLICATION,
  InterimApplicationType,
  WhichApplicant,
} from '../../../../../app/case/definition';
import { Step } from '../../../../../steps/applicant1Sequence';
import CheckAnswersPostController from '../../../../applicant1/interim-applications/common/check-answers/post';
import { generalApplicationD11Sequence } from '../../../../generalApplicationD11Sequence';

@autobind
export default class CheckGeneralApplicationD11AnswersPostController extends CheckAnswersPostController {
  protected getEventName(): string {
    return CITIZEN_GENERAL_APPLICATION;
  }

  protected interimApplicationType(): InterimApplicationType {
    return InterimApplicationType.DIGITISED_GENERAL_APPLICATION_D11;
  }

  protected interimApplicationSequence(): Step[] {
    return generalApplicationD11Sequence(WhichApplicant.APPLICANT_2);
  }
}
