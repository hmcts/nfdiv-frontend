import autobind from 'autobind-decorator';

import { CITIZEN_GENERAL_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition';
import { Step } from '../../../../../steps/applicant1Sequence';
import { searchGovRecordsApplicationSequence as searchGovRecordsSequence } from '../../../../searchGovRecordsApplicationSequence';
import CheckAnswersPostController from '../../common/check-answers/post';

@autobind
export default class CheckSearchGovRecordsAnswersPostController extends CheckAnswersPostController {
  protected getEventName(): string {
    return CITIZEN_GENERAL_APPLICATION;
  }

  protected interimApplicationType(): InterimApplicationType {
    return InterimApplicationType.SEARCH_GOV_RECORDS;
  }

  protected interimApplicationSequence(): Step[] {
    return searchGovRecordsSequence;
  }
}
