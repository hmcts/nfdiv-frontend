import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  ADDRESS_PRIVATE,
  APP_REPRESENTED,
  CHECK_ANSWERS_URL,
  CHECK_CONTACT_DETAILS,
  CHECK_PHONE_NUMBER,
  DETAILS_OTHER_PROCEEDINGS,
  DISPUTING_THE_APPLICATION,
  ENGLISH_OR_WELSH,
  ENTER_YOUR_ADDRESS,
  FINALISING_YOUR_APPLICATION,
  HELP_WITH_YOUR_FINAL_ORDER_FEE_URL,
  HOME_URL,
  HOW_DO_YOU_WANT_TO_RESPOND,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  HUB_PAGE,
  LEGAL_JURISDICTION_OF_THE_COURTS,
  OTHER_COURT_CASES,
  PAYMENT_CALLBACK_URL,
  PAY_YOUR_FINAL_ORDER_FEE,
  RESPONDENT,
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
      data.applicant2FoHelpPayingNeeded === YesOrNo.YES ? PAY_YOUR_FINAL_ORDER_FEE : PAY_YOUR_FINAL_ORDER_FEE,
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

export const respondentSequence = ((): Step[] => {
  return sequence.map(step => ({
    url: `${RESPONDENT}${step.url}`,
    getNextStep: data => `${RESPONDENT}${step.getNextStep(data)}`,
  }));
})();
