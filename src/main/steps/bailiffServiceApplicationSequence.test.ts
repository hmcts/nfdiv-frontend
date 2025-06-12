import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { bailiffServiceApplicationSequence } from './bailiffServiceApplicationSequence';
import {
  BAILIFF_SERVICE_APPLICATION,
  HELP_WITH_FEES_BAILIFF,
  HWF_REFERENCE_NUMBER_BAILIFF,
  HWF_REFERENCE_NUMBER_INPUT_BAILIFF,
  APPLY_FOR_HWF_BAILIFF,
  ENTER_PARTNERS_NAME_BAILIFF
} from './urls';

describe('Bailiff Service Application Sequence test', () => {
  describe('BAILIFF_SERVICE_APPLICATION', () => {
    test('BAILIFF_SERVICE_APPLICATION', () => {
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === BAILIFF_SERVICE_APPLICATION) as Step;
      expect(step.getNextStep({})).toBe(HELP_WITH_FEES_BAILIFF);
    });
  });
  
  describe('HELP_WITH_FEES_BAILIFF', () => {
    test('Use HWF', () => {
      const caseData = {
        applicant1InterimAppsUseHelpWithFees: YesOrNo.YES,
      };
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === HELP_WITH_FEES_BAILIFF) as Step;
      expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_BAILIFF);
    });

    test('Do not Use HWF', () => {
      const caseData = {
        applicant1InterimAppsUseHelpWithFees: YesOrNo.NO,
      };
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === HELP_WITH_FEES_BAILIFF) as Step;
      expect(step.getNextStep(caseData)).toBe(ENTER_PARTNERS_NAME_BAILIFF);
    });
  });
  
    describe('HWF_REFERENCE_NUMBER_BAILIFF', () => {
      test('Have HWF Ref', () => {
        const caseData = {
          applicant1InterimAppsHaveHwfReference: YesOrNo.YES,
        };
        const step = bailiffServiceApplicationSequence.find(obj => obj.url === HWF_REFERENCE_NUMBER_BAILIFF) as Step;
        expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_INPUT_BAILIFF);
      });
  
      test('Do not have HWF Ref', () => {
        const caseData = {
          applicant1InterimAppsHaveHwfReference: YesOrNo.NO,
        };
        const step = bailiffServiceApplicationSequence.find(obj => obj.url === HWF_REFERENCE_NUMBER_BAILIFF) as Step;
        expect(step.getNextStep(caseData)).toBe(APPLY_FOR_HWF_BAILIFF);
      });
    });
  
    describe('HWF_REFERENCE_NUMBER_INPUT_BAILIFF', () => {
      test('HWF_REFERENCE_NUMBER_INPUT_BAILIFF', () => {
        const step = bailiffServiceApplicationSequence.find(obj => obj.url === HWF_REFERENCE_NUMBER_INPUT_BAILIFF) as Step;
        expect(step.getNextStep({})).toBe(ENTER_PARTNERS_NAME_BAILIFF);
      });
    });
});
