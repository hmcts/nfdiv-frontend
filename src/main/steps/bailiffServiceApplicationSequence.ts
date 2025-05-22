import { Step } from './applicant1Sequence';
import { BAILIFF_SERVICE_APPLICATION, HELP_WITH_FEES_BAILIFF } from './urls';

export const bailiffServiceApplicationSequence: Step[] = [
  {
    url: BAILIFF_SERVICE_APPLICATION,
    getNextStep: () => HELP_WITH_FEES_BAILIFF,
  },
];
