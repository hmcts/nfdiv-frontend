import { Step } from './applicant1Sequence';
import { deemedServiceApplication } from './deemedServiceApplication';
import { DEEMED_INTERRUPTION, DEEMED_SERVICE_APPLICATION } from './urls';

describe('Deemed Service Application Sequence test', () => {
  describe('DEEMED_SERVICE_APPLICATION', () => {
    test('DEEMED_SERVICE_APPLICATION', () => {
      const step = deemedServiceApplication.find(obj => obj.url === DEEMED_SERVICE_APPLICATION) as Step;
      expect(step.getNextStep({})).toBe(DEEMED_INTERRUPTION);
    });
  });
});
