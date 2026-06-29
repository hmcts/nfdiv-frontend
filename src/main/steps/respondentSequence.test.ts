import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { sequence } from './respondentSequence';
import { ADDRESS_PRIVATE, CHECK_CONTACT_DETAILS, IN_REFUGE } from './urls';

describe('Respondent Sequence test', () => {
  describe('Respondent ADDRESS_PRIVATE', () => {
    const step = sequence.find(obj => obj.url === ADDRESS_PRIVATE) as Step;

    test('routes to in refuge when address is private', () => {
      const caseData = {
        applicant2AddressPrivate: YesOrNo.YES,
      };

      expect(step.getNextStep(caseData)).toBe(IN_REFUGE);
    });

    test('routes to check contact details when address is not private', () => {
      const caseData = {
        applicant2AddressPrivate: YesOrNo.NO,
      };

      expect(step.getNextStep(caseData)).toBe(CHECK_CONTACT_DETAILS);
    });
  });
  describe('Respondent IN_REFUGE', () => {
    const step = sequence.find(obj => obj.url === IN_REFUGE) as Step;

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
