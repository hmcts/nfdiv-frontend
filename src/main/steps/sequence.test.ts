import { mockRequest } from '../../test/unit/utils/mockRequest';

import { getNextStepUrl } from './sequence';
import {
  HAS_RELATIONSHIP_BROKEN_URL,
  PARTNER_GENDER_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
  UNION_CERTIFICATE_URL,
} from './urls';

describe('Sequence', () => {
  describe('getNextStep()', () => {
    let mockReq;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the next step when correct details a passed', () => {
      mockReq.originalUrl = PARTNER_GENDER_URL;
      expect(getNextStepUrl(mockReq, {})).toBe(HAS_RELATIONSHIP_BROKEN_URL);
    });

    it('returns current step if there is no next step', () => {
      mockReq.originalUrl = UNION_CERTIFICATE_URL;
      expect(getNextStepUrl(mockReq, {})).toBe(UNION_CERTIFICATE_URL);
    });

    it('moves into the substep when the response matches', () => {
      mockReq.originalUrl = HAS_RELATIONSHIP_BROKEN_URL;
      const actual = getNextStepUrl(mockReq, { screenHasUnionBroken: 'No' });
      expect(actual).toBe(RELATIONSHIP_NOT_BROKEN_URL);
    });

    it('keeps the query string', () => {
      mockReq.originalUrl = `${PARTNER_GENDER_URL}?customQueryString`;
      expect(getNextStepUrl(mockReq, {})).toBe(`${HAS_RELATIONSHIP_BROKEN_URL}?customQueryString`);
    });

    it.todo('returns current step if this is flagged as the lastPage');
  });
});
