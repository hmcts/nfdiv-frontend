import { mockRequest } from '../../test/unit/utils/mockRequest';
import { AppRequest } from '../app/controller/AppRequest';

import { HAS_RELATIONSHIP_BROKEN_URL, RELATIONSHIP_NOT_BROKEN_URL, YOUR_DETAILS_URL } from './urls';

import { Step, getLatestIncompleteStepUrl, getNextStepUrl, getSteps } from './';

describe('Steps', () => {
  describe('getSteps()', () => {
    it('returns the correct list of steps and their substeps', () => {
      const steps = getSteps();
      expect(steps.length).toBeGreaterThanOrEqual(1);
      for (const step of steps) {
        expect(step.id).toBeDefined();
        expect(step.title).toBeDefined();
        expect(step.url).toBeDefined();
      }
    });
  });

  describe('getNextStep()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('returns the next step when correct details a passed', () => {
      mockReq.originalUrl = YOUR_DETAILS_URL;
      expect(getNextStepUrl(mockReq)).toBe(HAS_RELATIONSHIP_BROKEN_URL);
    });

    it('returns current step if there is no next step', () => {
      mockReq.originalUrl = HAS_RELATIONSHIP_BROKEN_URL;
      expect(getNextStepUrl(mockReq)).toBe(HAS_RELATIONSHIP_BROKEN_URL);
    });

    it('moves into the substep when the response matches', () => {
      mockReq.originalUrl = HAS_RELATIONSHIP_BROKEN_URL;
      mockReq.body = { screenHasUnionBroken: 'No' };
      const actual = getNextStepUrl(mockReq);
      expect(actual).toBe(RELATIONSHIP_NOT_BROKEN_URL);
    });

    it('keeps the query string', () => {
      mockReq.originalUrl = `${YOUR_DETAILS_URL}?customQueryString`;
      expect(getNextStepUrl(mockReq)).toBe(`${HAS_RELATIONSHIP_BROKEN_URL}?customQueryString`);
    });

    it("returns a step not found URL if it doesn't exist", () => {
      mockReq.originalUrl = "I don't exist";
      expect(getNextStepUrl(mockReq)).toBe('/step-not-found');
    });
  });

  describe('getLatestIncompleteStepUrl()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      jest.resetModules();
      mockReq = mockRequest();
    });

    it('returns the first url if there is no session', () => {
      expect(getLatestIncompleteStepUrl(mockReq)).toBe(YOUR_DETAILS_URL);
    });

    it('returns the last incomplete step if there are validation errors', () => {
      mockReq.session.state = { ['your-details']: { partnerGender: '' } };
      expect(getLatestIncompleteStepUrl(mockReq)).toBe(YOUR_DETAILS_URL);
    });

    it('returns the next incomplete step if previous is valid', () => {
      mockReq.session.state = { ['your-details']: { partnerGender: 'valid' } };
      expect(getLatestIncompleteStepUrl(mockReq)).toBe(HAS_RELATIONSHIP_BROKEN_URL);
    });

    describe('Nested substeps', () => {
      const mockSequence = [
        { id: 'a', field: 'aResponse', url: 'a' },
        {
          id: 'b',
          field: 'bResponse',
          url: 'b',
          subSteps: [
            {
              id: 'ba',
              field: 'baResponse',
              when: res => res.bResponse === 'goto ba',
              url: 'ba',
            },
            {
              id: 'bb',
              field: 'bbResponse',
              when: res => res.bResponse === 'goto bb',
              url: 'bb',
              subSteps: [
                {
                  id: 'bba',
                  field: 'bbaResponse',
                  when: res => res.bbResponse === 'goto bba',
                  url: 'bba',
                  isFinalPage: true,
                },
                {
                  id: 'bbb',
                  field: 'bbbResponse',
                  when: res => res.bbResponse === 'goto bbb',
                  url: 'bbb',
                },
                {
                  id: 'bbc',
                  field: 'bbcResponse',
                  when: res => res.bbResponse === 'goto bbc',
                  url: 'bbc',
                },
              ],
            },
            {
              id: 'bc',
              field: 'bcResponse',
              when: res => res.bResponse === 'goto bc',
              url: 'bc',
            },
          ],
        },
        { id: 'c', field: 'cResponse', url: 'c' },
      ] as Step[];

      jest.mock('./sequence', () => ({ sequence: mockSequence }));

      it('handles a subnested step', () => {
        const { getLatestIncompleteStepUrl } = require('./');

        mockReq.session.state = {
          a: { aResponse: 'goto b' },
          b: { bResponse: 'goto bc' },
        };
        expect(getLatestIncompleteStepUrl(mockReq)).toBe('bc');
      });

      it('handles a subsubnested step', () => {
        const { getLatestIncompleteStepUrl } = require('./');

        mockReq.session.state = {
          a: { aResponse: 'goto b' },
          b: { bResponse: 'goto bb' },
          bb: { bbResponse: 'goto bbb' },
        };
        expect(getLatestIncompleteStepUrl(mockReq)).toBe('bbb');
      });

      it('handles a different subsubnested step', () => {
        const { getLatestIncompleteStepUrl } = require('./');

        mockReq.session.state = {
          a: { aResponse: 'goto b' },
          b: { bResponse: 'goto bb' },
          bb: { bbResponse: 'goto bbc' },
        };
        expect(getLatestIncompleteStepUrl(mockReq)).toBe('bbc');
      });

      it('handles subsubnested steps and then pops back onto the main line', () => {
        const { getLatestIncompleteStepUrl } = require('./');

        mockReq.session.state = {
          a: { aResponse: 'goto b' },
          b: { bResponse: 'goto bb' },
          bb: { bbResponse: 'goto bbc' },
          bbc: { bbcResponse: 'keep on going (back)' },
        };
        expect(getLatestIncompleteStepUrl(mockReq)).toBe('c');
      });

      it('goes to the first step if there are no incomplete steps', () => {
        const { getLatestIncompleteStepUrl } = require('./');

        mockReq.session.state = {
          a: { aResponse: 'goto b' },
          b: { bResponse: 'goto bb' },
          bb: { bbResponse: 'goto bbc' },
          bbc: { bbcResponse: 'keep on going (back)' },
          c: { cResponse: 'complete as well' },
        };
        expect(getLatestIncompleteStepUrl(mockReq)).toBe('a');
      });

      it("doesn't return final steps as the next incomplete step", () => {
        const { getLatestIncompleteStepUrl } = require('./');

        mockReq.session.state = {
          a: { aResponse: 'goto b' },
          b: { bResponse: 'goto bb' },
          bb: { bbResponse: 'goto bba' },
        };
        expect(getLatestIncompleteStepUrl(mockReq)).toBe('bb');
      });
    });
  });
});
