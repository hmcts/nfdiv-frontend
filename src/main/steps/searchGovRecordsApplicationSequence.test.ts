import { Step } from './applicant1Sequence';
import { HELP_WITH_FEES_SEARCH_GOV_RECORDS, SEARCH_GOV_RECORDS_APPLICATION } from './urls';
import { searchGovRecordsApplicationSequence } from './searchGovRecordsApplicationSequence';

describe('Search Gov Records General Application Sequence test', () => {
  describe('SEARCH_GOV_RECORDS_APPLICATION', () => {
    test('SEARCH_GOV_RECORDS_APPLICATION', () => {
      const step = searchGovRecordsApplicationSequence.find(
        obj => obj.url === SEARCH_GOV_RECORDS_APPLICATION
      ) as Step;
      expect(step.getNextStep({})).toBe(HELP_WITH_FEES_SEARCH_GOV_RECORDS);
    });
  });
});
