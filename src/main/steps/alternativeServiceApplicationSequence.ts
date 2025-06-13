import { Step } from './applicant1Sequence';
import { ALTERNATIVE_INTERRUPTION, ALTERNATIVE_SERVICE_APPLICATION } from './urls';

export const alternativeServiceApplicationSequence: Step[] = [
  {
    url: ALTERNATIVE_SERVICE_APPLICATION,
    getNextStep: () => ALTERNATIVE_INTERRUPTION,
  },
];
