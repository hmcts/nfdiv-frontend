import { YesOrNo } from '../app/case/definition';

import { Sections, Step } from './applicant1Sequence';
import {
  ADDRESS_PRIVATE,
  APPLICANT_2,
  APPLY_FINANCIAL_ORDER,
  APPLY_FINANCIAL_ORDER_DETAILS,
  CHANGES_TO_YOUR_NAME_URL,
  CHECK_ANSWERS_URL,
  CHECK_JOINT_APPLICATION,
  ENTER_YOUR_ACCESS_CODE,
  ENTER_YOUR_ADDRESS,
  HAS_RELATIONSHIP_BROKEN_URL,
  HOME_URL,
  HOW_DID_YOU_CHANGE_YOUR_NAME,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  NOT_CONFIRMED_JOINT_APPLICATION,
  OTHER_COURT_CASES,
  RELATIONSHIP_NOT_BROKEN_URL,
  YOUR_NAME,
  YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION,
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
    showInSection: Sections.AboutPartnership,
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
    showInSection: Sections.ContactYou,
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
    showInSection: Sections.ContactYou,
    getNextStep: () => ADDRESS_PRIVATE,
  },
  {
    url: ADDRESS_PRIVATE,
    showInSection: Sections.ContactYou,
    getNextStep: () => ENTER_YOUR_ADDRESS,
  },
  {
    url: ENTER_YOUR_ADDRESS,
    showInSection: Sections.ContactYou,
    getNextStep: () => OTHER_COURT_CASES,
  },
  {
    url: APPLY_FINANCIAL_ORDER,
    showInSection: Sections.DividingAssets,
    getNextStep: data =>
      data.applicant2ApplyForFinancialOrder === YesOrNo.YES ? APPLY_FINANCIAL_ORDER_DETAILS : CHECK_ANSWERS_URL,
  },
  {
    url: APPLY_FINANCIAL_ORDER_DETAILS,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION,
    getNextStep: () => HOME_URL,
  },
  {
    url: CHECK_ANSWERS_URL,
    getNextStep: () => HOME_URL,
  },
  {
    url: CHECK_JOINT_APPLICATION,
    getNextStep: data =>
      data.applicant2Confirmation === YesOrNo.YES
        ? CHECK_ANSWERS_URL
        : YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION,
  },
];

export const applicant2Sequence = ((): Step[] => {
  return sequences.map(sequence => ({
    ...sequence,
    url: `${APPLICANT_2}${sequence.url}`,
    getNextStep: data => `${APPLICANT_2}${sequence.getNextStep(data)}`,
  }));
})();
