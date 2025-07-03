import dayjs, { Dayjs } from 'dayjs';
import { CaseDate } from '../app/case/case';
import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { dispenseServiceApplicationSequence } from './dispenseServiceApplicationSequence';
import {
  APPLY_FOR_HWF_DISPENSE,
  AWARE_PARTNER_ADDRESS_DISPENSE,
  DA_SEARCH_DISPENSE,
  DISPENSE_SERVICE_APPLICATION,
  EMAIL_DISPENSE,
  HELP_WITH_FEES_DISPENSE,
  HWF_REFERENCE_NUMBER_DISPENSE,
  HWF_REFERENCE_NUMBER_INPUT_DISPENSE,
  LAST_ADDRESS_DISPENSE,
  LAST_DATE_DISPENSE,
  LAST_SEEN_DISPENSE,
  PARTNER_NEW_ADDRESS_DISPENSE,
} from './urls';

describe('Dispense With Service Application Sequence test', () => {
  describe('DISPENSE_SERVICE_APPLICATION', () => {
    test('DISPENSE_SERVICE_APPLICATION', () => {
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === DISPENSE_SERVICE_APPLICATION) as Step;
      expect(step.getNextStep({})).toBe(HELP_WITH_FEES_DISPENSE);
    });
  });

  describe('HELP_WITH_FEES_DISPENSE', () => {
    test('Use HWF', () => {
      const caseData = {
        applicant1InterimAppsUseHelpWithFees: YesOrNo.YES,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === HELP_WITH_FEES_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_DISPENSE);
    });

    test('Do not Use HWF', () => {
      const caseData = {
        applicant1InterimAppsUseHelpWithFees: YesOrNo.NO,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === HELP_WITH_FEES_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(LAST_DATE_DISPENSE);
    });
  });

  describe('HWF_REFERENCE_NUMBER_DISPENSE', () => {
    test('Have HWF Ref', () => {
      const caseData = {
        applicant1InterimAppsHaveHwfReference: YesOrNo.YES,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === HWF_REFERENCE_NUMBER_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_INPUT_DISPENSE);
    });

    test('Do not have HWF Ref', () => {
      const caseData = {
        applicant1InterimAppsHaveHwfReference: YesOrNo.NO,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === HWF_REFERENCE_NUMBER_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(APPLY_FOR_HWF_DISPENSE);
    });
  });

  describe('HWF_REFERENCE_NUMBER_INPUT_DISPENSE', () => {
    test('HWF_REFERENCE_NUMBER_INPUT_DISPENSE', () => {
      const step = dispenseServiceApplicationSequence.find(
        obj => obj.url === HWF_REFERENCE_NUMBER_INPUT_DISPENSE
      ) as Step;
      expect(step.getNextStep({})).toBe(LAST_DATE_DISPENSE);
    });
  });

  describe('LAST_DATE_DISPENSE', () => {
    test('LAST_ADDRESS_DISPENSE', () => {
      const caseData = {
        applicant1DispenseLiveTogether: YesOrNo.YES,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === LAST_DATE_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(LAST_ADDRESS_DISPENSE);
    });

    test('AWARE_PARTNER_ADDRESS_DISPENSE', () => {
      const caseData = {
        applicant1DispenseLiveTogether: YesOrNo.NO,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === LAST_DATE_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(AWARE_PARTNER_ADDRESS_DISPENSE);
    });
  });

  describe('LAST_ADDRESS_DISPENSE', () => {
    test('AWARE_PARTNER_ADDRESS_DISPENSE', () => {
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === LAST_ADDRESS_DISPENSE) as Step;
      expect(step.getNextStep({})).toBe(AWARE_PARTNER_ADDRESS_DISPENSE);
    });
  });

  describe('AWARE_PARTNER_ADDRESS_DISPENSE', () => {
    test('PARTNER_NEW_ADDRESS_DISPENSE', () => {
      const caseData = {
        applicant1DispenseAwarePartnerLived: YesOrNo.YES,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === AWARE_PARTNER_ADDRESS_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(PARTNER_NEW_ADDRESS_DISPENSE);
    });

    test('LAST_SEEN_DISPENSE', () => {
      const caseData = {
        applicant1DispenseAwarePartnerLived: YesOrNo.NO,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === AWARE_PARTNER_ADDRESS_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(LAST_SEEN_DISPENSE);
    });
  });

  describe('PARTNER_NEW_ADDRESS_DISPENSE', () => {
    test('LAST_SEEN_DISPENSE', () => {
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === PARTNER_NEW_ADDRESS_DISPENSE) as Step;
      expect(step.getNextStep({})).toBe(LAST_SEEN_DISPENSE);
    });
  });

  describe('LAST_SEEN_DISPENSE', () => {
    test('EMAIL_DISPENSE', () => {
      const testDate = dayjs(Date.now()).subtract(1, 'year');
      const caseData = {
        applicant1DispensePartnerLastSeenOrHeardOfDate: getCaseDate(testDate),
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === LAST_SEEN_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(EMAIL_DISPENSE);
    });

    test('DA_SEARCH_DISPENSE', () => {
      const testDate = dayjs(Date.now()).subtract(3, 'year');
      const caseData = {
        applicant1DispensePartnerLastSeenOrHeardOfDate: getCaseDate(testDate),
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === LAST_SEEN_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(DA_SEARCH_DISPENSE);
    });
  });
});

const getCaseDate = (date: Dayjs): CaseDate => ({
  year: date.year().toString(),
  month: date.month().toString(),
  day: date.date().toString(),
});
