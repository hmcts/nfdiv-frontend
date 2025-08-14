import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { searchGovRecordsApplicationSequence } from './searchGovRecordsApplicationSequence';
import {
  CHECK_YOUR_ANSWERS_GOV_RECORDS,
  GENERAL_APPLICATION_SUBMITTED,
  HELP_PAYING_NEED_TO_APPLY_SEARCH_GOV_RECORDS,
  HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS,
  HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS,
  PARTNER_ADDRESS_ADDITIONAL_ADDRESSES,
  PARTNER_ADDRESS_ADDITIONAL_GOV_RECORDS,
  PARTNER_ADDRESS_GOV_RECORDS,
  PARTNER_DOB_GOV_RECORDS,
  PARTNER_NAME_GOV_RECORDS,
  PARTNER_NI_GOV_RECORDS,
  PAY_YOUR_GENERAL_APPLICATION_FEE,
  SEARCH_GOV_RECORDS_APPLICATION,
  SEARCH_GOV_RECORDS_HWF,
  WHICH_GOV_DEPARTMENTS,
  WHY_SEARCH_GOV_RECORDS,
} from './urls';

describe('SEARCH_GOV_RECORDS', () => {
  test('Search gov records', () => {
    const caseData = {};
    const step = searchGovRecordsApplicationSequence.find(obj => obj.url === SEARCH_GOV_RECORDS_APPLICATION) as Step;
    expect(step.getNextStep(caseData)).toBe(SEARCH_GOV_RECORDS_HWF);
  });

  test('Search gov records help with fees required', () => {
    const caseData = {
      applicant1InterimAppsHaveHwfReference: YesOrNo.YES,
    };
    const step = searchGovRecordsApplicationSequence.find(obj => obj.url === SEARCH_GOV_RECORDS_HWF) as Step;
    expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS);
  });

  test('Search gov records help with fees not required', () => {
    const caseData = {
      applicant1InterimAppsHaveHwfReference: YesOrNo.NO,
    };
    const step = searchGovRecordsApplicationSequence.find(obj => obj.url === SEARCH_GOV_RECORDS_HWF) as Step;
    expect(step.getNextStep(caseData)).toBe(WHY_SEARCH_GOV_RECORDS);
  });

  test('Search gov records help with fees reference available', () => {
    const caseData = {
      applicant1InterimAppsHwfRefNumber: YesOrNo.YES,
    };
    const step = searchGovRecordsApplicationSequence.find(
      obj => obj.url === HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS
    ) as Step;
    expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS);
  });

  test('Search gov records apply for help with fees', () => {
    const caseData = {
      applicant1InterimAppsHwfRefNumber: YesOrNo.NO,
    };
    const step = searchGovRecordsApplicationSequence.find(
      obj => obj.url === HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS
    ) as Step;
    expect(step.getNextStep(caseData)).toBe(HELP_PAYING_NEED_TO_APPLY_SEARCH_GOV_RECORDS);
  });

  test('Search gov records enter HWF reference number', () => {
    const caseData = {};
    const step = searchGovRecordsApplicationSequence.find(
      obj => obj.url === HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS
    ) as Step;
    expect(step.getNextStep(caseData)).toBe(WHY_SEARCH_GOV_RECORDS);
  });

  test('Search gov records enter HWF reference number after applicant1 apply for HWF', () => {
    const caseData = {};
    const step = searchGovRecordsApplicationSequence.find(
      obj => obj.url === HELP_PAYING_NEED_TO_APPLY_SEARCH_GOV_RECORDS
    ) as Step;
    expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS);
  });

  test('Search gov records applicant1 attempts for search', () => {
    const caseData = {};
    const step = searchGovRecordsApplicationSequence.find(obj => obj.url === WHY_SEARCH_GOV_RECORDS) as Step;
    expect(step.getNextStep(caseData)).toBe(WHICH_GOV_DEPARTMENTS);
  });

  test('Search gov records applicant1 which gov departments to search', () => {
    const caseData = {};
    const step = searchGovRecordsApplicationSequence.find(obj => obj.url === WHICH_GOV_DEPARTMENTS) as Step;
    expect(step.getNextStep(caseData)).toBe(PARTNER_NAME_GOV_RECORDS);
  });

  test('Search gov records applicant1 enter applicant2 name', () => {
    const caseData = {};
    const step = searchGovRecordsApplicationSequence.find(obj => obj.url === PARTNER_NAME_GOV_RECORDS) as Step;
    expect(step.getNextStep(caseData)).toBe(PARTNER_DOB_GOV_RECORDS);
  });

  test('Search gov records applicant1 enter applicant2 date of birth', () => {
    const caseData = {};
    const step = searchGovRecordsApplicationSequence.find(obj => obj.url === PARTNER_DOB_GOV_RECORDS) as Step;
    expect(step.getNextStep(caseData)).toBe(PARTNER_NI_GOV_RECORDS);
  });

  test('Search gov records applicant1 applicant2 National Insurance number', () => {
    const caseData = {};
    const step = searchGovRecordsApplicationSequence.find(obj => obj.url === PARTNER_NI_GOV_RECORDS) as Step;
    expect(step.getNextStep(caseData)).toBe(PARTNER_ADDRESS_GOV_RECORDS);
  });

  test('Search gov records applicant1 applicant2 last known address', () => {
    const caseData = {};
    const step = searchGovRecordsApplicationSequence.find(obj => obj.url === PARTNER_ADDRESS_GOV_RECORDS) as Step;
    expect(step.getNextStep(caseData)).toBe(PARTNER_ADDRESS_ADDITIONAL_ADDRESSES);
  });

  test('Search gov records applicant1 knows applicant2 additional addresses', () => {
    const caseData = { applicant1SearchGovRecordsKnowPartnerAdditionalAddresses: YesOrNo.YES };
    const step = searchGovRecordsApplicationSequence.find(
      obj => obj.url === PARTNER_ADDRESS_ADDITIONAL_ADDRESSES
    ) as Step;
    expect(step.getNextStep(caseData)).toBe(PARTNER_ADDRESS_ADDITIONAL_GOV_RECORDS);
  });

  test("Search gov records applicant1 doesn't knows applicant2 additional addresses", () => {
    const caseData = { applicant1SearchGovRecordsKnowPartnerAdditionalAddresses: YesOrNo.NO };
    const step = searchGovRecordsApplicationSequence.find(
      obj => obj.url === PARTNER_ADDRESS_ADDITIONAL_ADDRESSES
    ) as Step;
    expect(step.getNextStep(caseData)).toBe(CHECK_YOUR_ANSWERS_GOV_RECORDS);
  });

  test('Search gov records applicant1 enter applicant2 additional addresses', () => {
    const caseData = {};
    const step = searchGovRecordsApplicationSequence.find(
      obj => obj.url === PARTNER_ADDRESS_ADDITIONAL_GOV_RECORDS
    ) as Step;
    expect(step.getNextStep(caseData)).toBe(CHECK_YOUR_ANSWERS_GOV_RECORDS);
  });

  describe('CHECK_ANSWERS_SEARCH_GOV', () => {
    test('CHECK_ANSWERS_SEARCH_GOV', () => {
      const step = searchGovRecordsApplicationSequence.find(obj => obj.url === CHECK_YOUR_ANSWERS_GOV_RECORDS) as Step;
      const caseData = {
        applicant1GeneralApplicationServiceRequest: 'dummy',
      };

      expect(step.getNextStep(caseData)).toBe(PAY_YOUR_GENERAL_APPLICATION_FEE);
    });

    test('CHECK_ANSWERS_SEARCH_GOV should redirect to GENERAL_APPLICATION_SUBMITTED if payment is not required', () => {
      const step = searchGovRecordsApplicationSequence.find(obj => obj.url === CHECK_YOUR_ANSWERS_GOV_RECORDS) as Step;
      const caseData = {
        applicant1GeneralApplicationServiceRequest: undefined,
      };

      expect(step.getNextStep(caseData)).toBe(GENERAL_APPLICATION_SUBMITTED);
    });
  });
});
