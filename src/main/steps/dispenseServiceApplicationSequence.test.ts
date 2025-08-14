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
  EMAIL_DESCRIPTION_DISPENSE,
  EMAIL_DISPENSE,
  EMPLOYMENT_CONTACT_DISPENSE,
  HELP_WITH_FEES_DISPENSE,
  HWF_REFERENCE_NUMBER_DISPENSE,
  HWF_REFERENCE_NUMBER_INPUT_DISPENSE,
  LAST_ADDRESS_DISPENSE,
  LAST_DATE_DISPENSE,
  LAST_SEEN_DISPENSE,
  PARTNER_NEW_ADDRESS_DISPENSE,
  PHONE_DESCRIPTION_DISPENSE,
  PHONE_NUMBER_DISPENSE,
  SEARCHING_ONLINE_DISPENSE,
  SEARCHING_ONLINE_RESULTS_DISPENSE,
  TRACING_AGENT_DISPENSE,
  TRACING_AGENT_RESULTS_DISPENSE,
  TRACING_ONLINE_DISPENSE,
  TRACING_ONLINE_RESULTS_DISPENSE,
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

  describe('DA_SEARCH_DISPENSE', () => {
    test('EMAIL_DISPENSE', () => {
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === DA_SEARCH_DISPENSE) as Step;
      expect(step.getNextStep({})).toBe(EMAIL_DISPENSE);
    });
  });

  describe('EMAIL_DISPENSE', () => {
    test('EMAIL_DESCRIPTION_DISPENSE', () => {
      const caseData = {
        applicant1DispenseHavePartnerEmailAddresses: YesOrNo.YES,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === EMAIL_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(EMAIL_DESCRIPTION_DISPENSE);
    });

    test('PHONE_NUMBER_DISPENSE', () => {
      const caseData = {
        applicant1DispenseHavePartnerEmailAddresses: YesOrNo.NO,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === EMAIL_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(PHONE_NUMBER_DISPENSE);
    });
  });

  describe('EMAIL_DESCRIPTION_DISPENSE', () => {
    test('PHONE_NUMBER_DISPENSE', () => {
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === EMAIL_DESCRIPTION_DISPENSE) as Step;
      expect(step.getNextStep({})).toBe(PHONE_NUMBER_DISPENSE);
    });
  });

  describe('PHONE_NUMBER_DISPENSE', () => {
    test('PHONE_DESCRIPTION_DISPENSE', () => {
      const caseData = {
        applicant1DispenseHavePartnerPhoneNumbers: YesOrNo.YES,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === PHONE_NUMBER_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(PHONE_DESCRIPTION_DISPENSE);
    });

    test('TRACING_AGENT_DISPENSE', () => {
      const caseData = {
        applicant1DispenseHavePartnerPhoneNumbers: YesOrNo.NO,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === PHONE_NUMBER_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(TRACING_AGENT_DISPENSE);
    });
  });

  describe('PHONE_DESCRIPTION_DISPENSE', () => {
    test('TRACING_AGENT_DISPENSE', () => {
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === PHONE_DESCRIPTION_DISPENSE) as Step;
      expect(step.getNextStep({})).toBe(TRACING_AGENT_DISPENSE);
    });
  });

  describe('TRACING_AGENT_DISPENSE', () => {
    test('TRACING_AGENT_RESULTS_DISPENSE', () => {
      const caseData = {
        applicant1DispenseTriedTracingAgent: YesOrNo.YES,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === TRACING_AGENT_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(TRACING_AGENT_RESULTS_DISPENSE);
    });

    test('TRACING_ONLINE_DISPENSE', () => {
      const caseData = {
        applicant1DispenseTriedTracingAgent: YesOrNo.NO,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === TRACING_AGENT_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(TRACING_ONLINE_DISPENSE);
    });
  });

  describe('TRACING_AGENT_RESULTS_DISPENSE', () => {
    test('TRACING_ONLINE_DISPENSE', () => {
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === TRACING_AGENT_RESULTS_DISPENSE) as Step;
      expect(step.getNextStep({})).toBe(TRACING_ONLINE_DISPENSE);
    });
  });

  describe('TRACING_ONLINE_DISPENSE', () => {
    test('TRACING_ONLINE_RESULTS_DISPENSE', () => {
      const caseData = {
        applicant1DispenseTriedTracingOnline: YesOrNo.YES,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === TRACING_ONLINE_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(TRACING_ONLINE_RESULTS_DISPENSE);
    });

    test('SEARCHING_ONLINE_DISPENSE', () => {
      const caseData = {
        applicant1DispenseTriedTracingOnline: YesOrNo.NO,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === TRACING_ONLINE_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(SEARCHING_ONLINE_DISPENSE);
    });
  });

  describe('TRACING_ONLINE_RESULTS_DISPENSE', () => {
    test('SEARCHING_ONLINE_DISPENSE', () => {
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === TRACING_ONLINE_RESULTS_DISPENSE) as Step;
      expect(step.getNextStep({})).toBe(SEARCHING_ONLINE_DISPENSE);
    });
  });

  describe('SEARCHING_ONLINE_DISPENSE', () => {
    test('SEARCHING_ONLINE_RESULTS_DISPENSE', () => {
      const caseData = {
        applicant1DispenseTriedSearchingOnline: YesOrNo.YES,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === SEARCHING_ONLINE_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(SEARCHING_ONLINE_RESULTS_DISPENSE);
    });

    test('EMPLOYMENT_CONTACT_DISPENSE', () => {
      const caseData = {
        applicant1DispenseTriedSearchingOnline: YesOrNo.NO,
      };
      const step = dispenseServiceApplicationSequence.find(obj => obj.url === SEARCHING_ONLINE_DISPENSE) as Step;
      expect(step.getNextStep(caseData)).toBe(EMPLOYMENT_CONTACT_DISPENSE);
    });
  });

  describe('SEARCHING_ONLINE_RESULTS_DISPENSE', () => {
    test('EMPLOYMENT_CONTACT_DISPENSE', () => {
      const step = dispenseServiceApplicationSequence.find(
        obj => obj.url === SEARCHING_ONLINE_RESULTS_DISPENSE
      ) as Step;
      expect(step.getNextStep({})).toBe(EMPLOYMENT_CONTACT_DISPENSE);
    });
  });
});

const getCaseDate = (date: Dayjs): CaseDate => ({
  year: date.year().toString(),
  month: date.month().toString(),
  day: date.date().toString(),
});
