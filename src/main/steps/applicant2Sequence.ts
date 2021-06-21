import { Step } from './applicant1Sequence';
import { CHECK_ANSWERS_URL, HAS_RELATIONSHIP_BROKEN_URL, HOME_URL, YOU_NEED_TO_REVIEW_YOUR_APPLICATION } from './urls';

export const applicant2Sequence: Step[] = [
  {
    url: YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
    getNextStep: () => `${HAS_RELATIONSHIP_BROKEN_URL}2`,
  },
  {
    url: `${HAS_RELATIONSHIP_BROKEN_URL}2`,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: CHECK_ANSWERS_URL,
    getNextStep: () => HOME_URL,
  },
];
