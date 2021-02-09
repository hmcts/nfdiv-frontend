import { mockRequest } from '../../test/unit/utils/mockRequest';

import { getNextStepUrl } from './sequence';
import { HAS_RELATIONSHIP_BROKEN_URL, RELATIONSHIP_NOT_BROKEN_URL, YOUR_DETAILS_URL } from './urls';

describe('Sequence', () => {
  describe('getNextStep()', () => {
    let mockReq;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the next step when correct details a passed', () => {
      mockReq.originalUrl = YOUR_DETAILS_URL;
      expect(getNextStepUrl(mockReq, {})).toBe(HAS_RELATIONSHIP_BROKEN_URL);
    });

    it('returns current step if there is no next step', () => {
      mockReq.originalUrl = HAS_RELATIONSHIP_BROKEN_URL;
      expect(getNextStepUrl(mockReq, {})).toBe(HAS_RELATIONSHIP_BROKEN_URL);
    });

    it('moves into the substep when the response matches', () => {
      mockReq.originalUrl = HAS_RELATIONSHIP_BROKEN_URL;
      const actual = getNextStepUrl(mockReq, { screenHasUnionBroken: 'No' });
      expect(actual).toBe(RELATIONSHIP_NOT_BROKEN_URL);
    });

    it('keeps the query string', () => {
      mockReq.originalUrl = `${YOUR_DETAILS_URL}?customQueryString`;
      expect(getNextStepUrl(mockReq, {})).toBe(`${HAS_RELATIONSHIP_BROKEN_URL}?customQueryString`);
    });

    it("returns a step not found URL if it doesn't exist", () => {
      mockReq.originalUrl = "I don't exist";
      expect(getNextStepUrl(mockReq, {})).toBe('/step-not-found');
    });

    it.todo('returns current step if this is flagged as the lastPage');
  });
});
