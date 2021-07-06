import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  ADDRESS_PRIVATE,
  APPLICANT_2,
  APPLY_FINANCIAL_ORDER,
  APPLY_FINANCIAL_ORDER_DETAILS,
  CHANGES_TO_YOUR_NAME_URL,
  CHECK_ANSWERS_URL,
  ENTER_YOUR_ACCESS_CODE,
  ENTER_YOUR_ADDRESS,
  HAS_RELATIONSHIP_BROKEN_URL,
  HOW_DID_YOU_CHANGE_YOUR_NAME,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  NOT_CONFIRMED_JOINT_APPLICATION,
  OTHER_COURT_CASES,
  RELATIONSHIP_NOT_BROKEN_URL,
  YOUR_NAME,
  YOU_CANNOT_APPLY,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from './urls';

const sequences: Step[] = [
  {
    url: ENTER_YOUR_ACCESS_CODE,
    getNextStep: () => YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
  },
  {
    url: YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_URL,
  },
  {
    url: HAS_RELATIONSHIP_BROKEN_URL,
    getNextStep: data => (data.screenHasApplicant2UnionBroken === YesOrNo.NO ? YOU_CANNOT_APPLY : YOUR_NAME),
  },
  {
    url: YOU_CANNOT_APPLY,
    getNextStep: () => NOT_CONFIRMED_JOINT_APPLICATION,
  },
  {
    url: NOT_CONFIRMED_JOINT_APPLICATION,
    getNextStep: () => RELATIONSHIP_NOT_BROKEN_URL,
  },
  {
    url: YOUR_NAME,
    getNextStep: () => CHANGES_TO_YOUR_NAME_URL,
  },
  {
    url: CHANGES_TO_YOUR_NAME_URL,
    getNextStep: data =>
      data.applicant2LastNameChangedWhenRelationshipFormed === YesOrNo.YES ||
      data.applicant2NameChangedSinceRelationshipFormed === YesOrNo.YES
        ? HOW_DID_YOU_CHANGE_YOUR_NAME
        : HOW_THE_COURTS_WILL_CONTACT_YOU,
  },
  {
    url: HOW_THE_COURTS_WILL_CONTACT_YOU,
    getNextStep: () => ADDRESS_PRIVATE,
  },
  {
    url: ADDRESS_PRIVATE,
    getNextStep: () => ENTER_YOUR_ADDRESS,
  },
  {
    url: ENTER_YOUR_ADDRESS,
    getNextStep: () => OTHER_COURT_CASES,
  },
  {
    url: APPLY_FINANCIAL_ORDER,
    getNextStep: data =>
      data.applicant2ApplyForFinancialOrder === YesOrNo.YES ? APPLY_FINANCIAL_ORDER_DETAILS : CHECK_ANSWERS_URL,
  },
  {
    url: APPLY_FINANCIAL_ORDER_DETAILS,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
];

export const applicant2Sequence = ((): Step[] => {
  return sequences.map(sequence => ({
    ...sequence,
    url: `${APPLICANT_2}${sequence.url}`,
    getNextStep: data => `${APPLICANT_2}${sequence.getNextStep(data)}`,
  }));
})();
