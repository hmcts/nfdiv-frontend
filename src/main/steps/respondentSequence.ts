import { YesOrNo } from '../app/case/definition';

import { Sections, Step } from './applicant1Sequence';
import {
  CHECK_ANSWERS_URL,
  DETAILS_OTHER_PROCEEDINGS,
  ENGLISH_OR_WELSH,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  OTHER_COURT_CASES,
  RESPONDENT,
} from './urls';

const sequences: Step[] = [
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
    url: ENGLISH_OR_WELSH,
    showInSection: Sections.ContactYou,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
];

export const respondentSequence = ((): Step[] => {
  return sequences.map(sequence => ({
    ...sequence,
    url: `${RESPONDENT}${sequence.url}`,
    getNextStep: data => `${RESPONDENT}${sequence.getNextStep(data)}`,
  }));
})();
