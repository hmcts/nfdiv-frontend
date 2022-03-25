import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  ADDRESS_PRIVATE,
  CHECK_ANSWERS_URL,
  CHECK_CONTACT_DETAILS,
  CHECK_PHONE_NUMBER,
  DETAILS_OTHER_PROCEEDINGS,
  DISPUTING_THE_APPLICATION,
  ENTER_YOUR_ADDRESS,
  FINALISING_YOUR_APPLICATION,
  HOME_URL,
  HOW_DO_YOU_WANT_TO_RESPOND,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  HUB_PAGE,
  LEGAL_JURISDICTION_OF_THE_COURTS,
  OTHER_COURT_CASES,
  RESPONDENT,
  REVIEW_THE_APPLICATION,
} from './urls';

const preSubmissionSequence: Step[] = [
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
];

const postSubmissionSequence: Step[] = [
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
    getNextStep: () => HUB_PAGE,
  },
];

const addRespondentPrefix = (theSequence: Step[]): Step[] => {
  return theSequence.map(step => ({
    ...step,
    url: `${RESPONDENT}${step.url}`,
    getNextStep: data => `${RESPONDENT}${step.getNextStep(data)}`,
  }));
};

export const respondentPreSubmissionSequence = addRespondentPrefix(preSubmissionSequence);
export const respondentPostSubmissionSequence = addRespondentPrefix(postSubmissionSequence);
