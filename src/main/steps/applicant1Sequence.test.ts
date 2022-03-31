import { ApplicationType } from '../app/case/definition';

import { Step, applicant1PreSubmissionSequence, isCountryUk } from './applicant1Sequence';
import { ENTER_THEIR_ADDRESS, OTHER_COURT_CASES, YOU_NEED_TO_SERVE } from './urls';

describe('Applicant 1 Sequence test', () => {
  describe('ENTER_THEIR_ADDRESS', () => {
    const caseData = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      applicant2AddressCountry: 'United Kingdom',
    };

    test('Applicant 2 Country - United Kingdom', () => {
      const step = applicant1PreSubmissionSequence.find(obj => obj.url === ENTER_THEIR_ADDRESS) as Step;
      expect(step.getNextStep(caseData)).toBe(OTHER_COURT_CASES);
    });

    test('Applicant 2 Country - u.k', () => {
      caseData.applicant2AddressCountry = 'u.k';
      const step = applicant1PreSubmissionSequence.find(obj => obj.url === ENTER_THEIR_ADDRESS) as Step;
      expect(step.getNextStep(caseData)).toBe(OTHER_COURT_CASES);
    });

    test('Applicant 2 Country - France', () => {
      caseData.applicant2AddressCountry = 'France';
      const step = applicant1PreSubmissionSequence.find(obj => obj.url === ENTER_THEIR_ADDRESS) as Step;
      expect(step.getNextStep(caseData)).toBe(YOU_NEED_TO_SERVE);
    });
  });
});

describe('isCountryUk test', () => {
  test('True UK terms', () => {
    const ukTermsTest = ['uk', 'unitedkingdom', 'u.k', 'u.k.'];
    for (const term of ukTermsTest) {
      expect(isCountryUk(term)).toBe(true);
    }
  });

  test('False UK term', () => {
    const nonUkCountry = 'France';
    expect(isCountryUk(nonUkCountry)).toBe(false);
  });

  test('Undefined country', () => {
    expect(isCountryUk(undefined)).toBe(false);
  });
});
