import { CaseWithId } from '../app/case/case';
import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  HELP_PAYING_NEED_TO_APPLY_SEARCH_GOV_RECORDS,
  HUB_PAGE,
  HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS,
  HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS,
  PageLink,
  SEARCH_GOV_RECORDS_APPLICATION,
  SEARCH_GOV_RECORDS_HWF,
  WHY_SEARCH_GOV_RECORDS,
} from './urls';

export const searchGovRecordsJourneySequence: Step[] = [
  {
    url: SEARCH_GOV_RECORDS_APPLICATION,
    getNextStep: () => SEARCH_GOV_RECORDS_HWF,
  },
  {
    url: SEARCH_GOV_RECORDS_HWF,
    getNextStep: (data: Partial<CaseWithId>): PageLink =>
      data.applicant1InterimAppsHaveHwfReference === YesOrNo.YES
        ? HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS
        : WHY_SEARCH_GOV_RECORDS,
  },
  {
    url: HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      return data.applicant1InterimAppsHwfRefNumber === YesOrNo.YES
        ? HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS
        : HELP_PAYING_NEED_TO_APPLY_SEARCH_GOV_RECORDS;
    },
  },
  {
    url: HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS,
    getNextStep: (): PageLink => WHY_SEARCH_GOV_RECORDS,
  },
  {
    url: HELP_PAYING_NEED_TO_APPLY_SEARCH_GOV_RECORDS,
    getNextStep: (): PageLink => HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS,
  },
  {
    url: WHY_SEARCH_GOV_RECORDS,
    getNextStep: (): PageLink => HUB_PAGE,
  },
];
