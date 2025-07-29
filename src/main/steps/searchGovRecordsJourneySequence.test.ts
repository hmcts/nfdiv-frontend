import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { searchGovRecordsJourneySequence } from './searchGovRecordsJourneySequence';
import {
  HELP_PAYING_NEED_TO_APPLY_SEARCH_GOV_RECORDS,
  HUB_PAGE,
  HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS,
  HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS,
  SEARCH_GOV_RECORDS_APPLICATION,
  SEARCH_GOV_RECORDS_HWF,
  WHY_SEARCH_GOV_RECORDS,
} from './urls';

describe('SEARCH_GOV_RECORDS', () => {
  test('Search gov records', () => {
    const caseData = {};
    const step = searchGovRecordsJourneySequence.find(obj => obj.url === SEARCH_GOV_RECORDS_APPLICATION) as Step;
    expect(step.getNextStep(caseData)).toBe(SEARCH_GOV_RECORDS_HWF);
  });

  test('Search gov records help with fees required', () => {
    const caseData = {
      applicant1InterimAppsHaveHwfReference: YesOrNo.YES,
    };
    const step = searchGovRecordsJourneySequence.find(obj => obj.url === SEARCH_GOV_RECORDS_HWF) as Step;
    expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS);
  });

  test('Search gov records help with fees not required', () => {
    const caseData = {
      applicant1InterimAppsHaveHwfReference: YesOrNo.NO,
    };
    const step = searchGovRecordsJourneySequence.find(obj => obj.url === SEARCH_GOV_RECORDS_HWF) as Step;
    expect(step.getNextStep(caseData)).toBe(WHY_SEARCH_GOV_RECORDS);
  });
  test('Search gov records help with fees reference available', () => {
    const caseData = {
      applicant1InterimAppsHwfRefNumber: YesOrNo.YES,
    };
    const step = searchGovRecordsJourneySequence.find(
      obj => obj.url === HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS
    ) as Step;
    expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS);
  });
  test('Search gov records apply for help with fees', () => {
    const caseData = {
      applicant1InterimAppsHwfRefNumber: YesOrNo.NO,
    };
    const step = searchGovRecordsJourneySequence.find(
      obj => obj.url === HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS
    ) as Step;
    expect(step.getNextStep(caseData)).toBe(HELP_PAYING_NEED_TO_APPLY_SEARCH_GOV_RECORDS);
  });
  test('Search gov records enter HWF reference number', () => {
    const caseData = {};
    const step = searchGovRecordsJourneySequence.find(
      obj => obj.url === HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS
    ) as Step;
    expect(step.getNextStep(caseData)).toBe(WHY_SEARCH_GOV_RECORDS);
  });
  test('Search gov records enter HWF reference number after applicant1 apply for HWF', () => {
    const caseData = {};
    const step = searchGovRecordsJourneySequence.find(
      obj => obj.url === HELP_PAYING_NEED_TO_APPLY_SEARCH_GOV_RECORDS
    ) as Step;
    expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS);
  });
  test('Search gov records applicant1 attempts for search', () => {
    const caseData = {};
    const step = searchGovRecordsJourneySequence.find(obj => obj.url === WHY_SEARCH_GOV_RECORDS) as Step;
    expect(step.getNextStep(caseData)).toBe(HUB_PAGE);
  });
});
