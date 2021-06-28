import { Step } from './applicant1Sequence';
import {
  APPLY_FINANCIAL_ORDER,
  HAS_RELATIONSHIP_BROKEN_APPLICANT2,
  HOME_URL,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from './urls';

export const applicant2Sequence: Step[] = [
  {
    url: YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_APPLICANT2,
  },
  {
    url: HAS_RELATIONSHIP_BROKEN_APPLICANT2,
    getNextStep: () => HOME_URL,
  },
  {
    url: APPLY_FINANCIAL_ORDER,
    getNextStep: () => HOME_URL,
  },
];
