import { Step } from './applicant1Sequence';
import { CHECK_ANSWERS_URL, HOME_URL, YOUR_NAME, YOU_NEED_TO_REVIEW_YOUR_APPLICATION } from './urls';

export const applicant2Sequence: Step[] = [
  {
    url: YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
    getNextStep: () => `${YOUR_NAME}2`,
  },
  {
    url: `${YOUR_NAME}2`,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: CHECK_ANSWERS_URL,
    getNextStep: () => HOME_URL,
  },
];
