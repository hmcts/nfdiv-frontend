import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  CHANGES_TO_YOUR_NAME_URL2,
  HAS_RELATIONSHIP_BROKEN_APPLICANT2,
  HOME_URL,
  HOW_DID_YOU_CHANGE_YOUR_NAME2,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from './urls';

export const applicant2Sequence: Step[] = [
  {
    url: YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_APPLICANT2,
  },
  {
    url: HAS_RELATIONSHIP_BROKEN_APPLICANT2,
    getNextStep: () => HOW_DID_YOU_CHANGE_YOUR_NAME2,
  },
  {
    url: CHANGES_TO_YOUR_NAME_URL2,
    getNextStep: data =>
      data.applicant2LastNameChangedWhenRelationshipFormed === YesOrNo.YES ||
      data.applicant2NameChangedSinceRelationshipFormed === YesOrNo.YES
        ? HOW_DID_YOU_CHANGE_YOUR_NAME2
        : HOME_URL,
  },
  {
    url: HOW_DID_YOU_CHANGE_YOUR_NAME2,
    getNextStep: () => HOME_URL,
  },
];
