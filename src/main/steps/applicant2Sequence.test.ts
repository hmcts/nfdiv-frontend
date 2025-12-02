import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { preSubmissionSequence } from './applicant2Sequence';
import {
  APPLY_FINANCIAL_ORDER,
  APPLY_FINANCIAL_ORDER_DETAILS,
  CHECK_JOINT_APPLICATION,
  UPLOAD_YOUR_DOCUMENTS,
} from './urls';

describe('Applicant 2 Sequence test', () => {
  describe('APPLY_FINANCIAL_ORDER', () => {
    test('applicant2ApplyForFinancialOrder - name has changed', () => {
      const caseData = {
        applicant2ApplyForFinancialOrder: YesOrNo.YES,
        applicant2NameDifferentToMarriageCertificate: YesOrNo.YES,
      };

      const step = preSubmissionSequence.find(obj => obj.url === APPLY_FINANCIAL_ORDER) as Step;
      expect(step.getNextStep(caseData)).toBe(APPLY_FINANCIAL_ORDER_DETAILS);
    });

    test('applicant2ApplyForFinancialOrder - name has not changed', () => {
      const caseData = {
        applicant2ApplyForFinancialOrder: YesOrNo.YES,
        applicant2NameDifferentToMarriageCertificate: YesOrNo.NO,
      };

      const step = preSubmissionSequence.find(obj => obj.url === APPLY_FINANCIAL_ORDER) as Step;
      expect(step.getNextStep(caseData)).toBe(APPLY_FINANCIAL_ORDER_DETAILS);
    });

    test('applicant2ApplyForFinancialOrder - NO & name has not changed', () => {
      const caseData = {
        applicant2ApplyForFinancialOrder: YesOrNo.NO,
        applicant2NameDifferentToMarriageCertificate: YesOrNo.NO,
      };

      const step = preSubmissionSequence.find(obj => obj.url === APPLY_FINANCIAL_ORDER) as Step;
      expect(step.getNextStep(caseData)).toBe(CHECK_JOINT_APPLICATION);
    });

    test('applicant2ApplyForFinancialOrder - NO & name has changed', () => {
      const caseData = {
        applicant2ApplyForFinancialOrder: YesOrNo.NO,
        applicant2NameDifferentToMarriageCertificate: YesOrNo.YES,
      };

      const step = preSubmissionSequence.find(obj => obj.url === APPLY_FINANCIAL_ORDER) as Step;
      expect(step.getNextStep(caseData)).toBe(UPLOAD_YOUR_DOCUMENTS);
    });
  });

  describe('APPLY_FINANCIAL_ORDER_DETAILS', () => {
    test('applicant2 name has changed', () => {
      const caseData = {
        applicant2NameDifferentToMarriageCertificate: YesOrNo.YES,
      };

      const step = preSubmissionSequence.find(obj => obj.url === APPLY_FINANCIAL_ORDER) as Step;
      expect(step.getNextStep(caseData)).toBe(UPLOAD_YOUR_DOCUMENTS);
    });

    test('applicant2 name has not changed', () => {
      const caseData = {
        applicant2NameDifferentToMarriageCertificate: YesOrNo.NO,
      };

      const step = preSubmissionSequence.find(obj => obj.url === APPLY_FINANCIAL_ORDER) as Step;
      expect(step.getNextStep(caseData)).toBe(CHECK_JOINT_APPLICATION);
    });
  });
});
