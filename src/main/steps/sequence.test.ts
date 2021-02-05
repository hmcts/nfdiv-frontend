import { getNextStepUrl } from './sequence';
import { HAS_MARRIAGE_BROKEN_URL, MARRIAGE_CERTIFICATE_URL, MARRIAGE_NOT_BROKEN_URL } from './urls';

describe('Sequence', () => {
  describe('getNextStep()', () => {
    it('returns the next step when correct details a passed', () => {
      expect(getNextStepUrl(HAS_MARRIAGE_BROKEN_URL, {})).toBe(MARRIAGE_CERTIFICATE_URL);
    });

    it('returns current step if there is no next step', () => {
      expect(getNextStepUrl(MARRIAGE_CERTIFICATE_URL, {})).toBe(MARRIAGE_CERTIFICATE_URL);
    });

    it('moves into the substep when the response matches', () => {
      const actual = getNextStepUrl(HAS_MARRIAGE_BROKEN_URL, { screenHasUnionBroken: 'No' });
      expect(actual).toBe(MARRIAGE_NOT_BROKEN_URL);
    });

    it.todo('returns current step if this is flagged as the lastPage');
  });
});
