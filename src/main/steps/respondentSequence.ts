import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  ADDRESS_PRIVATE,
  APPLICANT_2,
  APP_REPRESENTED,
  CHECK_ANSWERS_URL,
  CHECK_CONTACT_DETAILS,
  CHECK_PHONE_NUMBER,
  DETAILS_OTHER_PROCEEDINGS,
  DISPUTING_THE_APPLICATION,
  ENGLISH_OR_WELSH,
  ENTER_YOUR_ADDRESS,
  FINALISING_YOUR_APPLICATION,
  HELP_PAYING_FINAL_ORDER_HAVE_YOU_APPLIED,
  HELP_PAYING_FINAL_ORDER_NEED_TO_APPLY,
  HELP_WITH_YOUR_FINAL_ORDER_FEE_URL,
  HOME_URL,
  HOW_DO_YOU_WANT_TO_RESPOND,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  HUB_PAGE,
  INTEND_TO_DELAY,
  LEGAL_JURISDICTION_OF_THE_COURTS,
  OTHER_COURT_CASES,
  PAYMENT_CALLBACK_URL,
  PAY_YOUR_FINAL_ORDER_FEE,
  RESPONDENT,
  RESPONSE_SUBMITTED,
  REVIEW_THE_APPLICATION,
} from './urls';

const sequence: Step[] = [
  {
    url: REVIEW_THE_APPLICATION,
    getNextStep: () => HOW_DO_YOU_WANT_TO_RESPOND,
  },
  {
    url: HOW_DO_YOU_WANT_TO_RESPOND,
    getNextStep: data =>
      data.disputeApplication === YesOrNo.YES ? DISPUTING_THE_APPLICATION : LEGAL_JURISDICTION_OF_THE_COURTS,
  },
  {
    url: DISPUTING_THE_APPLICATION,
    getNextStep: data =>
      data.disputeApplication === YesOrNo.YES ? LEGAL_JURISDICTION_OF_THE_COURTS : HOW_DO_YOU_WANT_TO_RESPOND,
  },
  {
    url: LEGAL_JURISDICTION_OF_THE_COURTS,
    getNextStep: () => INTEND_TO_DELAY,
  },
  {
    url: INTEND_TO_DELAY,
    getNextStep: () => OTHER_COURT_CASES,
  },
  {
    url: OTHER_COURT_CASES,
    getNextStep: data =>
      data.applicant2LegalProceedings === YesOrNo.YES ? DETAILS_OTHER_PROCEEDINGS : HOW_THE_COURTS_WILL_CONTACT_YOU,
  },
  {
    url: DETAILS_OTHER_PROCEEDINGS,
    getNextStep: () => HOW_THE_COURTS_WILL_CONTACT_YOU,
  },
  {
    url: HOW_THE_COURTS_WILL_CONTACT_YOU,
    getNextStep: () => ENGLISH_OR_WELSH,
  },
  {
    url: ENGLISH_OR_WELSH,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: CHECK_ANSWERS_URL,
    getNextStep: () => RESPONSE_SUBMITTED,
  },
  {
    url: RESPONSE_SUBMITTED,
    getNextStep: () => HUB_PAGE,
  },
  {
    url: HUB_PAGE,
    getNextStep: () => HOME_URL,
  },
  {
    url: CHECK_CONTACT_DETAILS,
    getNextStep: () => HOME_URL,
  },
  {
    url: CHECK_PHONE_NUMBER,
    getNextStep: () => ADDRESS_PRIVATE,
  },
  {
    url: ENTER_YOUR_ADDRESS,
    getNextStep: () => ADDRESS_PRIVATE,
  },
  {
    url: ADDRESS_PRIVATE,
    getNextStep: () => CHECK_CONTACT_DETAILS,
  },
  {
    url: FINALISING_YOUR_APPLICATION,
    getNextStep: () => HELP_WITH_YOUR_FINAL_ORDER_FEE_URL,
  },
  {
    url: HELP_WITH_YOUR_FINAL_ORDER_FEE_URL,
    getNextStep: data =>
      data.applicant2FoHelpPayingNeeded === YesOrNo.YES
        ? HELP_PAYING_FINAL_ORDER_HAVE_YOU_APPLIED
        : PAY_YOUR_FINAL_ORDER_FEE,
  },
  {
    url: HELP_PAYING_FINAL_ORDER_HAVE_YOU_APPLIED,
    getNextStep: data =>
      data.applicant2FoAlreadyAppliedForHelpPaying === YesOrNo.NO ? HELP_PAYING_FINAL_ORDER_NEED_TO_APPLY : HUB_PAGE,
  },
  {
    url: HELP_PAYING_FINAL_ORDER_NEED_TO_APPLY,
    getNextStep: () => HELP_PAYING_FINAL_ORDER_HAVE_YOU_APPLIED,
  },
  {
    url: PAY_YOUR_FINAL_ORDER_FEE,
    getNextStep: () => PAYMENT_CALLBACK_URL,
  },
  {
    url: PAYMENT_CALLBACK_URL,
    getNextStep: () => HUB_PAGE,
  },
  {
    url: APP_REPRESENTED,
    getNextStep: () => HOME_URL,
  },
];

// Generate respondentSequence from the baseSequence
export const respondentSequence = ((): Step[] => {
  return sequence.map(step => ({
    url: step.url === APP_REPRESENTED ? `${APPLICANT_2}${APP_REPRESENTED}` : `${RESPONDENT}${step.url}`,
    getNextStep: data => `${RESPONDENT}${step.getNextStep(data)}`,
  }));
})();
