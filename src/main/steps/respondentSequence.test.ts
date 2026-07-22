import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { sequence } from './respondentSequence';
import { CHECK_CONTACT_DETAILS, UPDATE_ADDRESS_PRIVATE, UPDATE_IN_REFUGE } from './urls';

describe('Respondent Sequence test', () => {
  describe('Respondent ADDRESS_PRIVATE', () => {
    const step = sequence.find(obj => obj.url === UPDATE_ADDRESS_PRIVATE) as Step;

    test('routes to in refuge when address is private', () => {
      const caseData = {
        applicant2AddressPrivate: YesOrNo.YES,
      };

      expect(step.getNextStep(caseData)).toBe(UPDATE_IN_REFUGE);
    });

    test('routes to check contact details when address is not private', () => {
      const caseData = {
        applicant2AddressPrivate: YesOrNo.NO,
      };

      expect(step.getNextStep(caseData)).toBe(CHECK_CONTACT_DETAILS);
    });
  });
  describe('Respondent UPDATE_IN_REFUGE', () => {
    const step = sequence.find(obj => obj.url === UPDATE_IN_REFUGE) as Step;

    test('routes to in refuge when address is private', () => {
      const caseData = {
        applicant2InRefuge: YesOrNo.YES,
      };

      expect(step.getNextStep(caseData)).toBe(CHECK_CONTACT_DETAILS);
    });

    test('routes to check contact details when address is not private', () => {
      const caseData = {
        applicant2InRefuge: YesOrNo.NO,
      };

      expect(step.getNextStep(caseData)).toBe(CHECK_CONTACT_DETAILS);
    });
  });
});
