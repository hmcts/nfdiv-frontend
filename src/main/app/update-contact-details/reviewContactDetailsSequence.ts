import { Step } from '../../steps/applicant1Sequence';
import {
  ADDRESS_PRIVATE,
  APPLICANT_2,
  CHECK_CONTACT_DETAILS,
  CHECK_PHONE_NUMBER,
  ENTER_YOUR_ADDRESS,
  HOME_URL,
  RESPONDENT,
} from '../../steps/urls';
import { ApplicationType } from '../case/definition';

const sequences: Step[] = [
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
];

export const reviewContactDetailsSequence = (isApplicant2: boolean, applicationType: ApplicationType): Step[] => {
  if (isApplicant2) {
    const prefixUrl = applicationType === ApplicationType.SOLE_APPLICATION ? RESPONDENT : APPLICANT_2;
    return sequences.map(sequence => ({
      ...sequence,
      url: `${prefixUrl}${sequence.url}`,
      getNextStep: data => `${prefixUrl}${sequence.getNextStep(data)}`,
    }));
  }
  return sequences;
};
