import { Step } from './applicant1Sequence';
import { DISPENSE_SERVICE_APPLICATION, HELP_WITH_FEES_DISPENSE } from './urls';

export const dispenseServiceApplicationSequence: Step[] = [
  {
    url: DISPENSE_SERVICE_APPLICATION,
    getNextStep: () => HELP_WITH_FEES_DISPENSE,
  },
];
