import { Step } from './applicant1Sequence';
import {
  CHANGES_TO_YOUR_NAME_URL_APPLICANT2,
  HAS_RELATIONSHIP_BROKEN_APPLICANT2,
  YOUR_NAME_APPLICANT2,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from './urls';

export const applicant2Sequence: Step[] = [
  {
    url: YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_APPLICANT2,
  },
  {
    url: HAS_RELATIONSHIP_BROKEN_APPLICANT2,
    getNextStep: () => YOUR_NAME_APPLICANT2,
  },
  {
    url: YOUR_NAME_APPLICANT2,
    getNextStep: () => CHANGES_TO_YOUR_NAME_URL_APPLICANT2,
  },
];
