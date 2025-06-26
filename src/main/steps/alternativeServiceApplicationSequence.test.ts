import { YesOrNo } from '../app/case/definition';

import { alternativeServiceApplicationSequence } from './alternativeServiceApplicationSequence';
import { Step } from './applicant1Sequence';
import {
  ALTERNATIVE_INTERRUPTION,
  ALTERNATIVE_SERVICE_APPLICATION,
  ALTERNATIVE_WHY_OTHER_WAY,
  APPLY_FOR_HWF_ALTERNATIVE,
  HELP_WITH_FEES_ALTERNATIVE,
  HWF_REFERENCE_NUMBER_ALTERNATIVE,
  HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE,
} from './urls';

describe('Alternative Service Application Sequence test', () => {
  describe('ALTERNATIVE_SERVICE_APPLICATION', () => {
    test('ALTERNATIVE_SERVICE_APPLICATION', () => {
      const step = alternativeServiceApplicationSequence.find(
        obj => obj.url === ALTERNATIVE_SERVICE_APPLICATION
      ) as Step;
      expect(step.getNextStep({})).toBe(ALTERNATIVE_INTERRUPTION);
    });
  });

  describe('ALTERNATIVE_INTERRUPTION', () => {
    test('ALTERNATIVE_INTERRUPTION', () => {
      const step = alternativeServiceApplicationSequence.find(obj => obj.url === ALTERNATIVE_INTERRUPTION) as Step;
      expect(step.getNextStep({})).toBe(HELP_WITH_FEES_ALTERNATIVE);
    });
  });

  describe('HELP_WITH_FEES_ALTERNATIVE', () => {
    test('Use HWF', () => {
      const caseData = {
        applicant1InterimAppsUseHelpWithFees: YesOrNo.YES,
      };
      const step = alternativeServiceApplicationSequence.find(obj => obj.url === HELP_WITH_FEES_ALTERNATIVE) as Step;
      expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_ALTERNATIVE);
    });

    test('Do not use HWF', () => {
      const caseData = {
        applicant1InterimAppsUseHelpWithFees: YesOrNo.NO,
      };
      const step = alternativeServiceApplicationSequence.find(obj => obj.url === HELP_WITH_FEES_ALTERNATIVE) as Step;
      expect(step.getNextStep(caseData)).toBe(ALTERNATIVE_WHY_OTHER_WAY);
    });
  });

  describe('HWF_REFERENCE_NUMBER_ALTERNATIVE', () => {
    test('Have HWF Ref', () => {
      const caseData = {
        applicant1InterimAppsHaveHwfReference: YesOrNo.YES,
      };
      const step = alternativeServiceApplicationSequence.find(
        obj => obj.url === HWF_REFERENCE_NUMBER_ALTERNATIVE
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE);
    });

    test('Do not have HWF Ref', () => {
      const caseData = {
        applicant1InterimAppsHaveHwfReference: YesOrNo.NO,
      };
      const step = alternativeServiceApplicationSequence.find(
        obj => obj.url === HWF_REFERENCE_NUMBER_ALTERNATIVE
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(APPLY_FOR_HWF_ALTERNATIVE);
    });
  });

  describe('HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE', () => {
    test('HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE', () => {
      const step = alternativeServiceApplicationSequence.find(
        obj => obj.url === HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE
      ) as Step;
      expect(step.getNextStep({})).toBe(ALTERNATIVE_WHY_OTHER_WAY);
    });
  });

  describe('APPLY_FOR_HWF_ALTERNATIVE', () => {
    test('APPLY_FOR_HWF_ALTERNATIVE', () => {
      const step = alternativeServiceApplicationSequence.find(obj => obj.url === APPLY_FOR_HWF_ALTERNATIVE) as Step;
      expect(step.getNextStep({})).toBe(HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE);
    });
  });
});
