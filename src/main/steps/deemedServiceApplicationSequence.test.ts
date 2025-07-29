import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { deemedServiceApplicationSequence } from './deemedServiceApplicationSequence';
import {
  APPLY_FOR_HWF_DEEMED,
  CHECK_ANSWERS_DEEMED,
  DEEMED_INTERRUPTION,
  DEEMED_SERVICE_APPLICATION,
  HELP_WITH_FEES_DEEMED,
  HOW_DO_YOU_KNOW_DEEMED,
  HUB_PAGE,
  HWF_REFERENCE_NUMBER_DEEMED,
  HWF_REFERENCE_NUMBER_INPUT_DEEMED,
  PAY_YOUR_SERVICE_FEE,
  SERVICE_APPLICATION_SUBMITTED,
  UPLOAD_EVIDENCE_DEEMED,
  WANT_UPLOAD_EVIDENCE_DEEMED,
  WHY_NO_EVIDENCE_DEEMED,
} from './urls';

describe('Deemed Service Application Sequence test', () => {
  describe('DEEMED_SERVICE_APPLICATION', () => {
    test('DEEMED_SERVICE_APPLICATION', () => {
      const step = deemedServiceApplicationSequence.find(obj => obj.url === DEEMED_SERVICE_APPLICATION) as Step;
      expect(step.getNextStep({})).toBe(DEEMED_INTERRUPTION);
    });
  });

  describe('DEEMED_INTERRUPTION', () => {
    test('DEEMED_INTERRUPTION', () => {
      const step = deemedServiceApplicationSequence.find(obj => obj.url === DEEMED_INTERRUPTION) as Step;
      expect(step.getNextStep({})).toBe(HELP_WITH_FEES_DEEMED);
    });
  });

  describe('HELP_WITH_FEES_DEEMED', () => {
    test('Use HWF', () => {
      const caseData = {
        applicant1InterimAppsUseHelpWithFees: YesOrNo.YES,
      };
      const step = deemedServiceApplicationSequence.find(obj => obj.url === HELP_WITH_FEES_DEEMED) as Step;
      expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_DEEMED);
    });

    test('Do not Use HWF', () => {
      const caseData = {
        applicant1InterimAppsUseHelpWithFees: YesOrNo.NO,
      };
      const step = deemedServiceApplicationSequence.find(obj => obj.url === HELP_WITH_FEES_DEEMED) as Step;
      expect(step.getNextStep(caseData)).toBe(WANT_UPLOAD_EVIDENCE_DEEMED);
    });
  });

  describe('HWF_REFERENCE_NUMBER_DEEMED', () => {
    test('Have HWF Ref', () => {
      const caseData = {
        applicant1InterimAppsHaveHwfReference: YesOrNo.YES,
      };
      const step = deemedServiceApplicationSequence.find(obj => obj.url === HWF_REFERENCE_NUMBER_DEEMED) as Step;
      expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_INPUT_DEEMED);
    });

    test('Do not have HWF Ref', () => {
      const caseData = {
        applicant1InterimAppsHaveHwfReference: YesOrNo.NO,
      };
      const step = deemedServiceApplicationSequence.find(obj => obj.url === HWF_REFERENCE_NUMBER_DEEMED) as Step;
      expect(step.getNextStep(caseData)).toBe(APPLY_FOR_HWF_DEEMED);
    });
  });

  describe('HWF_REFERENCE_NUMBER_INPUT_DEEMED', () => {
    test('HWF_REFERENCE_NUMBER_INPUT_DEEMED', () => {
      const step = deemedServiceApplicationSequence.find(obj => obj.url === HWF_REFERENCE_NUMBER_INPUT_DEEMED) as Step;
      expect(step.getNextStep({})).toBe(WANT_UPLOAD_EVIDENCE_DEEMED);
    });
  });

  describe('WANT_UPLOAD_EVIDENCE_DEEMED', () => {
    test('Have Evidence', () => {
      const caseData = {
        applicant1InterimAppsCanUploadEvidence: YesOrNo.YES,
      };
      const step = deemedServiceApplicationSequence.find(obj => obj.url === WANT_UPLOAD_EVIDENCE_DEEMED) as Step;
      expect(step.getNextStep(caseData)).toBe(UPLOAD_EVIDENCE_DEEMED);
    });

    test('Do not have Evidence', () => {
      const caseData = {
        applicant1InterimAppsCanUploadEvidence: YesOrNo.NO,
      };
      const step = deemedServiceApplicationSequence.find(obj => obj.url === WANT_UPLOAD_EVIDENCE_DEEMED) as Step;
      expect(step.getNextStep(caseData)).toBe(WHY_NO_EVIDENCE_DEEMED);
    });
  });

  describe('APPLY_FOR_HWF_DEEMED', () => {
    test('APPLY_FOR_HWF_DEEMED', () => {
      const step = deemedServiceApplicationSequence.find(obj => obj.url === APPLY_FOR_HWF_DEEMED) as Step;
      expect(step.getNextStep({})).toBe(HWF_REFERENCE_NUMBER_INPUT_DEEMED);
    });
  });

  describe('WHY_NO_EVIDENCE_DEEMED', () => {
    test('WHY_NO_EVIDENCE_DEEMED', () => {
      const step = deemedServiceApplicationSequence.find(obj => obj.url === WHY_NO_EVIDENCE_DEEMED) as Step;
      expect(step.getNextStep({})).toBe(CHECK_ANSWERS_DEEMED);
    });
  });

  describe('UPLOAD_EVIDENCE_DEEMED', () => {
    test('UPLOAD_EVIDENCE_DEEMED', () => {
      const step = deemedServiceApplicationSequence.find(obj => obj.url === UPLOAD_EVIDENCE_DEEMED) as Step;
      expect(step.getNextStep({})).toBe(HOW_DO_YOU_KNOW_DEEMED);
    });
  });

  describe('HOW_DO_YOU_KNOW_DEEMED', () => {
    test('HOW_DO_YOU_KNOW_DEEMED', () => {
      const step = deemedServiceApplicationSequence.find(obj => obj.url === HOW_DO_YOU_KNOW_DEEMED) as Step;
      expect(step.getNextStep({})).toBe(CHECK_ANSWERS_DEEMED);
    });
  });

  describe('CHECK_ANSWERS_DEEMED', () => {
    test('CHECK_ANSWERS_DEEMED', () => {
      const step = deemedServiceApplicationSequence.find(obj => obj.url === CHECK_ANSWERS_DEEMED) as Step;
      const caseData = {
        alternativeServiceFeeRequired: YesOrNo.YES,
      };

      expect(step.getNextStep(caseData)).toBe(PAY_YOUR_SERVICE_FEE);
    });
    test('CHECK_ANSWERS_DEEMED should redirect to SERVICE_APPLICATION_SUBMITTED if payment is not required', () => {
      const step = deemedServiceApplicationSequence.find(obj => obj.url === CHECK_ANSWERS_DEEMED) as Step;
      const caseData = {
        alternativeServiceFeeRequired: YesOrNo.NO,
      };

      expect(step.getNextStep(caseData)).toBe(SERVICE_APPLICATION_SUBMITTED);
    });
  });
});
