import { CITIZEN_GENERAL_APPLICATION, InterimApplicationType } from '../../../../../app/case/definition.js';
import autobind from '../../../../../app/utils/autobind.js';
import { Step } from '../../../../../steps/applicant1Sequence.js';
import { searchGovRecordsApplicationSequence as searchGovRecordsSequence } from '../../../../searchGovRecordsApplicationSequence.js';
import CheckAnswersPostController from '../../common/check-answers/post.js';

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
