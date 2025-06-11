import { Step } from './applicant1Sequence';
import { DISPENSE_SERVICE_APPLICATION, HELP_WITH_FEES_DISPENSE } from './urls';
import { dispenseServiceApplicationSequence } from './dispenseServiceApplicationSequence';

describe('Dispense With Service Application Sequence test', () => {
  describe('DISPENSE_SERVICE_APPLICATION', () => {
    test('DISPENSE_SERVICE_APPLICATION', () => {
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === DISPENSE_SERVICE_APPLICATION) as Step;
      expect(step.getNextStep({})).toBe(HELP_WITH_FEES_DISPENSE);
    });
  });
});
