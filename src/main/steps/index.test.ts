import { mockRequest } from '../../test/unit/utils/mockRequest';
import { AppRequest } from '../app/controller/AppRequest';

import { HAS_RELATIONSHIP_BROKEN_URL, RELATIONSHIP_NOT_BROKEN_URL, YOUR_DETAILS_URL } from './urls';

import { Step, getNextIncompleteStepUrl, getNextStepUrl, getSteps } from './';

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

    describe('Nested substeps', () => {
      it('returns a nested substep when the form input matches', () => {
        mockReq.originalUrl = 'b';
        mockReq.body = { bResponse: 'goto bc' };
        expect(getNextStepUrl(mockReq, getSteps([], mockNestedSequence))).toBe('bc');
      });

      it('handles a subsubnested step', () => {
        mockReq.originalUrl = 'bb';
        mockReq.body = { bbResponse: 'goto bbb' };
        expect(getNextStepUrl(mockReq, mockNestedSequence)).toBe('bbb');
      });

      it('handles subsubnested steps and then pops back onto the main line', () => {
        mockReq.originalUrl = 'bbc';
        mockReq.body = { bbcResponse: 'back to the main line' };
        expect(getNextStepUrl(mockReq, getSteps([], mockNestedSequence))).toBe('c');
      });

      it('goes the first step from a substep if there are no steps left', () => {
        mockReq.originalUrl = 'da';
        mockReq.body = { daResponse: 'goto a' };
        expect(getNextStepUrl(mockReq, mockNestedSequence)).toBe('a');
      });
    });
  });

  describe('getNextIncompleteStepUrl()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      jest.resetModules();
      mockReq = mockRequest();
    });

    it('returns the first url if there is no session', () => {
      expect(getNextIncompleteStepUrl(mockReq)).toBe(YOUR_DETAILS_URL);
    });

    it('returns the last incomplete step if there are validation errors', () => {
      mockReq.session.state = { ['your-details']: { partnerGender: '' } };
      expect(getNextIncompleteStepUrl(mockReq)).toBe(YOUR_DETAILS_URL);
    });

    it('returns the next incomplete step if previous is valid', () => {
      mockReq.session.state = { ['your-details']: { partnerGender: 'valid' } };
      expect(getNextIncompleteStepUrl(mockReq)).toBe(HAS_RELATIONSHIP_BROKEN_URL);
    });

    it('keeps the query string', () => {
      mockReq.originalUrl = `${YOUR_DETAILS_URL}?customQueryString`;
      mockReq.session.state = {
        ['your-details']: { partnerGender: 'Male' },
      };
      expect(getNextStepUrl(mockReq)).toBe(`${HAS_RELATIONSHIP_BROKEN_URL}?customQueryString`);
    });

    describe('Nested substeps', () => {
      it('handles a subnested step', () => {
        mockReq.session.state = {
          a: { aResponse: 'goto b' },
          b: { bResponse: 'goto bc' },
        };
        expect(getNextIncompleteStepUrl(mockReq, mockNestedSequence)).toBe('bc');
      });

      it('handles a subsubnested step', () => {
        mockReq.session.state = {
          a: { aResponse: 'goto b' },
          b: { bResponse: 'goto bb' },
          bb: { bbResponse: 'goto bbb' },
        };
        expect(getNextIncompleteStepUrl(mockReq, mockNestedSequence)).toBe('bbb');
      });

      it('handles a different subsubnested step', () => {
        mockReq.session.state = {
          a: { aResponse: 'goto b' },
          b: { bResponse: 'goto bb' },
          bb: { bbResponse: 'goto bbc' },
        };
        expect(getNextIncompleteStepUrl(mockReq, mockNestedSequence)).toBe('bbc');
      });

      it('handles subsubnested steps and then pops back onto the main line', () => {
        mockReq.session.state = {
          a: { aResponse: 'goto b' },
          b: { bResponse: 'goto bb' },
          bb: { bbResponse: 'goto bbc' },
          bbc: { bbcResponse: 'keep on going (back)' },
        };
        expect(getNextIncompleteStepUrl(mockReq, mockNestedSequence)).toBe('c');
      });

      it('goes to the first step if there are no incomplete steps', () => {
        mockReq.session.state = {
          a: { aResponse: 'goto b' },
          b: { bResponse: 'goto bb' },
          bb: { bbResponse: 'goto bbc' },
          bbc: { bbcResponse: 'keep on going (back)' },
          c: { cResponse: 'complete as well' },
          d: { dResponse: 'complete' },
        };
        expect(getNextIncompleteStepUrl(mockReq, mockNestedSequence)).toBe('a');
      });

      it('goes to the first step if there are no incomplete substeps', () => {
        mockReq.session.state = {
          a: { aResponse: 'goto b' },
          b: { bResponse: 'goto bb' },
          bb: { bbResponse: 'goto bbc' },
          bbc: { bbcResponse: 'keep on going (back)' },
          c: { cResponse: 'complete as well' },
          d: { dResponse: 'goto da' },
          da: { daResponse: 'complete' },
        };
        expect(getNextIncompleteStepUrl(mockReq, mockNestedSequence)).toBe('a');
      });

      it("doesn't return final steps as the next incomplete step", () => {
        mockReq.session.state = {
          a: { aResponse: 'goto b' },
          b: { bResponse: 'goto bb' },
          bb: { bbResponse: 'goto bba' },
        };
        expect(getNextIncompleteStepUrl(mockReq, mockNestedSequence)).toBe('bb');
      });
    });
  });
});

const mockNestedSequence = [
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
      {
        id: 'bd',
        field: 'bdResponse',
        when: res => res.bResponse === 'goto bd',
        url: 'bd',
      },
    ],
  },
  { id: 'c', field: 'cResponse', url: 'c' },
  {
    id: 'd',
    field: 'dResponse',
    url: 'd',
    subSteps: [
      {
        id: 'da',
        field: 'daResponse',
        when: res => res.dResponse === 'goto da',
        url: 'da',
      },
    ],
  },
] as Step[];
