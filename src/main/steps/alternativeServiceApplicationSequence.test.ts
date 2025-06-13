import { alternativeServiceApplicationSequence } from './alternativeServiceApplicationSequence';
import { Step } from './applicant1Sequence';
import { ALTERNATIVE_INTERRUPTION, ALTERNATIVE_SERVICE_APPLICATION } from './urls';

describe('Alternative Service Application Sequence test', () => {
  describe('ALTERNATIVE_SERVICE_APPLICATION', () => {
    test('ALTERNATIVE_SERVICE_APPLICATION', () => {
      const step = alternativeServiceApplicationSequence.find(
        obj => obj.url === ALTERNATIVE_SERVICE_APPLICATION
      ) as Step;
      expect(step.getNextStep({})).toBe(ALTERNATIVE_INTERRUPTION);
    });
  });
});
