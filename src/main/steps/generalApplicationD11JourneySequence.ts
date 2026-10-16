import { Step } from './applicant1Sequence.js';
import { HUB_PAGE, MAKE_AN_APPLICATION } from './urls.js';

export const generalApplicationD11JourneySequence: Step[] = [
  {
    url: MAKE_AN_APPLICATION,
    getNextStep: () => HUB_PAGE,
  },
];
