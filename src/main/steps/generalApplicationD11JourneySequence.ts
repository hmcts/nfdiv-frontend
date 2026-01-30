import { Step } from './applicant1Sequence';
import { HUB_PAGE, MAKE_AN_APPLICATION } from './urls';

export const generalApplicationD11JourneySequence: Step[] = [
  {
    url: MAKE_AN_APPLICATION,
    getNextStep: () => HUB_PAGE,
  },
];
