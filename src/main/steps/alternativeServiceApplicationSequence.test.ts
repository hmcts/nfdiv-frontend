import { YesOrNo } from '../app/case/definition';

import { alternativeServiceApplicationSequence } from './alternativeServiceApplicationSequence';
import { Step } from './applicant1Sequence';
import {
  ALTERNATIVE_EXPLAIN_SERVE_DOCUMENTS,
  ALTERNATIVE_INTERRUPTION,
  ALTERNATIVE_SENDING_PAPERS_TO_PARTNER,
  ALTERNATIVE_SERVICE_APPLICATION,
  ALTERNATIVE_WHY_APPLY_THIS_WAY,
  APPLY_FOR_HWF_ALTERNATIVE,
  CHECK_ANSWERS_ALTERNATIVE,
  HELP_WITH_FEES_ALTERNATIVE,
  HWF_REFERENCE_NUMBER_ALTERNATIVE,
  HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE,
  PAY_YOUR_SERVICE_FEE,
  SERVICE_APPLICATION_SUBMITTED,
  UPLOAD_EVIDENCE_ALTERNATIVE,
  WANT_UPLOAD_EVIDENCE_ALTERNATIVE,
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
      expect(step.getNextStep(caseData)).toBe(ALTERNATIVE_EXPLAIN_SERVE_DOCUMENTS);
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
      expect(step.getNextStep({})).toBe(ALTERNATIVE_EXPLAIN_SERVE_DOCUMENTS);
    });
  });

  describe('APPLY_FOR_HWF_ALTERNATIVE', () => {
    test('APPLY_FOR_HWF_ALTERNATIVE', () => {
      const step = alternativeServiceApplicationSequence.find(obj => obj.url === APPLY_FOR_HWF_ALTERNATIVE) as Step;
      expect(step.getNextStep({})).toBe(HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE);
    });
  });

  describe('ALTERNATIVE_WHY_OTHER_WAY', () => {
    test('ALTERNATIVE_WHY_OTHER_WAY', () => {
      const step = alternativeServiceApplicationSequence.find(
        obj => obj.url === ALTERNATIVE_EXPLAIN_SERVE_DOCUMENTS
      ) as Step;
      expect(step.getNextStep({})).toBe(ALTERNATIVE_SENDING_PAPERS_TO_PARTNER);
    });
  });

  describe('ALTERNATIVE_SENDING_PAPERS_TO_PARTNER', () => {
    test('ALTERNATIVE_SENDING_PAPERS_TO_PARTNER', () => {
      const step = alternativeServiceApplicationSequence.find(
        obj => obj.url === ALTERNATIVE_SENDING_PAPERS_TO_PARTNER
      ) as Step;
      expect(step.getNextStep({})).toBe(WANT_UPLOAD_EVIDENCE_ALTERNATIVE);
    });
  });

  describe('WANT_UPLOAD_EVIDENCE_ALTERNATIVE', () => {
    test('Have Evidence', () => {
      const caseData = {
        applicant1InterimAppsCanUploadEvidence: YesOrNo.YES,
      };
      const step = alternativeServiceApplicationSequence.find(
        obj => obj.url === WANT_UPLOAD_EVIDENCE_ALTERNATIVE
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(UPLOAD_EVIDENCE_ALTERNATIVE);
    });

    test('Do not have Evidence', () => {
      const caseData = {
        applicant1InterimAppsCanUploadEvidence: YesOrNo.NO,
      };
      const step = alternativeServiceApplicationSequence.find(
        obj => obj.url === WANT_UPLOAD_EVIDENCE_ALTERNATIVE
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(ALTERNATIVE_WHY_APPLY_THIS_WAY);
    });
  });

  describe('UPLOAD_EVIDENCE_ALTERNATIVE', () => {
    test('UPLOAD_EVIDENCE_ALTERNATIVE', () => {
      const step = alternativeServiceApplicationSequence.find(obj => obj.url === UPLOAD_EVIDENCE_ALTERNATIVE) as Step;
      expect(step.getNextStep({})).toBe(ALTERNATIVE_WHY_APPLY_THIS_WAY);
    });
  });

  describe('ALTERNATIVE_WHY_APPLY_THIS_WAY', () => {
    test('ALTERNATIVE_WHY_APPLY_THIS_WAY', () => {
      const step = alternativeServiceApplicationSequence.find(
        obj => obj.url === ALTERNATIVE_WHY_APPLY_THIS_WAY
      ) as Step;
      expect(step.getNextStep({})).toBe(CHECK_ANSWERS_ALTERNATIVE);
    });
  });

  describe('CHECK_ANSWERS_ALTERNATIVE', () => {
    test('CHECK_ANSWERS_ALTERNATIVE should redirect to PAY_YOUR_SERVICE_FEE if payment is required', () => {
      const step = alternativeServiceApplicationSequence.find(obj => obj.url === CHECK_ANSWERS_ALTERNATIVE) as Step;
      const caseData = {
        alternativeServiceFeeRequired: YesOrNo.YES,
      };

      expect(step.getNextStep(caseData)).toBe(PAY_YOUR_SERVICE_FEE);
    });

    test('CHECK_ANSWERS_ALTERNATIVE should redirect to SERVICE_APPLICATION_SUBMITTED if payment is not required', () => {
      const step = alternativeServiceApplicationSequence.find(obj => obj.url === CHECK_ANSWERS_ALTERNATIVE) as Step;
      const caseData = {
        alternativeServiceFeeRequired: YesOrNo.NO,
      };

      expect(step.getNextStep(caseData)).toBe(SERVICE_APPLICATION_SUBMITTED);
    });
  });
});
