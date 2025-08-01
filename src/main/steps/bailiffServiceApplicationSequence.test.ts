import { Step } from './applicant1Sequence';
import { bailiffServiceApplicationSequence } from './bailiffServiceApplicationSequence';
import { BAILIFF_SERVICE_APPLICATION, HELP_WITH_FEES_BAILIFF } from './urls';

describe('Bailiff Service Application Sequence test', () => {
  describe('BAILIFF_SERVICE_APPLICATION', () => {
    test('BAILIFF_SERVICE_APPLICATION', () => {
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === BAILIFF_SERVICE_APPLICATION) as Step;
      expect(step.getNextStep({})).toBe(HELP_WITH_FEES_BAILIFF);
    });
  });
});
