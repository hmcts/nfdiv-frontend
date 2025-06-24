import { Step } from './applicant1Sequence';
import { HELP_WITH_FEES_SEARCH_GOV_RECORDS, SEARCH_GOV_RECORDS_APPLICATION } from './urls';

export const searchGovRecordsApplicationSequence: Step[] = [
  {
    url: SEARCH_GOV_RECORDS_APPLICATION,
    getNextStep: () => HELP_WITH_FEES_SEARCH_GOV_RECORDS,
  },
];
