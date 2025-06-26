import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { dispenseServiceApplicationSequence } from './dispenseServiceApplicationSequence';
import {
  APPLY_FOR_HWF_DISPENSE,
  DISPENSE_SERVICE_APPLICATION,
  HELP_WITH_FEES_DISPENSE,
  HWF_REFERENCE_NUMBER_DISPENSE,
  HWF_REFERENCE_NUMBER_INPUT_DISPENSE,
  LAST_DATE_DISPENSE,
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
});
