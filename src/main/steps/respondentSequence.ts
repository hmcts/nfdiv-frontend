import { YesOrNo } from '../app/case/definition';

import { Sections, Step } from './applicant1Sequence';
import {
  CHECK_ANSWERS_URL,
  CHECK_CONTACT_DETAILS,
  DETAILS_OTHER_PROCEEDINGS,
  DISPUTING_THE_APPLICATION,
  ENGLISH_OR_WELSH,
  HOME_URL,
  HOW_DO_YOU_WANT_TO_RESPOND,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  HUB_PAGE,
  LEGAL_JURISDICTION_OF_THE_COURTS,
  OTHER_COURT_CASES,
  RESPONDENT,
  REVIEW_THE_APPLICATION,
} from './urls';

const sequences: Step[] = [
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
    showInSection: Sections.OtherCourtCases,
    getNextStep: data =>
      data.applicant2LegalProceedings === YesOrNo.YES ? DETAILS_OTHER_PROCEEDINGS : HOW_THE_COURTS_WILL_CONTACT_YOU,
  },
  {
    url: DETAILS_OTHER_PROCEEDINGS,
    showInSection: Sections.OtherCourtCases,
    getNextStep: () => HOW_THE_COURTS_WILL_CONTACT_YOU,
  },
  {
    url: HOW_THE_COURTS_WILL_CONTACT_YOU,
    showInSection: Sections.ContactYou,
    getNextStep: () => ENGLISH_OR_WELSH,
  },
  {
    url: ENGLISH_OR_WELSH,
    showInSection: Sections.ContactYou,
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
];

export const respondentSequence = ((): Step[] => {
  return sequences.map(sequence => ({
    ...sequence,
    url: `${RESPONDENT}${sequence.url}`,
    getNextStep: data => `${RESPONDENT}${sequence.getNextStep(data)}`,
  }));
})();
