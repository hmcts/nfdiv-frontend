import { Step } from './applicant1Sequence';
import {
  HAS_RELATIONSHIP_BROKEN_APPLICANT2,
  HOME_URL,
  HOW_THE_COURTS_WILL_CONTACT_YOU_APPLICANT2,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from './urls';

export const applicant2Sequence: Step[] = [
  {
    url: YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_APPLICANT2,
  },
  {
    url: HAS_RELATIONSHIP_BROKEN_APPLICANT2,
    // TODO - replace next step with Keep details private as part of NFDIV-788
    getNextStep: () => HOME_URL,
  },
  {
    url: HOW_THE_COURTS_WILL_CONTACT_YOU_APPLICANT2,
    getNextStep: () => HOME_URL,
  },
];
