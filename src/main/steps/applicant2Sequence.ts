import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  APPLICANT_2,
  HAS_RELATIONSHIP_BROKEN_URL,
  HOME_URL,
  NOT_CONFIRMED_JOINT_APPLICATION,
  RELATIONSHIP_NOT_BROKEN_URL,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from './urls';

const sequences: Step[] = [
  {
    url: YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_URL,
  },
  {
    url: HAS_RELATIONSHIP_BROKEN_URL,
    // TODO - to be replaced with Has your marriage irretrievably broken down page once developed
    getNextStep: data => (data.screenHasApplicant2UnionBroken === YesOrNo.NO ? RELATIONSHIP_NOT_BROKEN_URL : HOME_URL),
  },
  {
    url: RELATIONSHIP_NOT_BROKEN_URL,
    getNextStep: () => NOT_CONFIRMED_JOINT_APPLICATION,
  },
  {
    url: NOT_CONFIRMED_JOINT_APPLICATION,
    getNextStep: () => RELATIONSHIP_NOT_BROKEN_URL,
  },
];

export const applicant2Sequence = ((): Step[] => {
  return sequences.map(sequence => ({
    ...sequence,
    url: `${APPLICANT_2}${sequence.url}`,
    getNextStep: data => `${APPLICANT_2}${sequence.getNextStep(data)}`,
  }));
})();
