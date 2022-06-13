import { ChangedNameHow, YesOrNo } from '../app/case/definition';

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
    test('applicant2ApplyForFinancialOrder - YES', () => {
      const caseData = {
        applicant2ApplyForFinancialOrder: YesOrNo.YES,
        applicant2NameChangedHow: [ChangedNameHow.OTHER],
      };

      const step = preSubmissionSequence.find(obj => obj.url === APPLY_FINANCIAL_ORDER) as Step;
      expect(step.getNextStep(caseData)).toBe(APPLY_FINANCIAL_ORDER_DETAILS);
    });

    test('applicant2ApplyForFinancialOrder - NO & deed poll', () => {
      const caseData = {
        applicant2ApplyForFinancialOrder: YesOrNo.NO,
        applicant2NameChangedHow: [ChangedNameHow.DEED_POLL],
      };

      const step = preSubmissionSequence.find(obj => obj.url === APPLY_FINANCIAL_ORDER) as Step;
      expect(step.getNextStep(caseData)).toBe(UPLOAD_YOUR_DOCUMENTS);
    });

    test('applicant2ApplyForFinancialOrder - NO & other', () => {
      const caseData = {
        applicant2ApplyForFinancialOrder: YesOrNo.NO,
        applicant2NameChangedHow: [ChangedNameHow.OTHER],
      };

      const step = preSubmissionSequence.find(obj => obj.url === APPLY_FINANCIAL_ORDER) as Step;
      expect(step.getNextStep(caseData)).toBe(UPLOAD_YOUR_DOCUMENTS);
    });

    test('applicant2ApplyForFinancialOrder - NO & marriage certificate', () => {
      const caseData = {
        applicant2ApplyForFinancialOrder: YesOrNo.NO,
        applicant2NameChangedHow: [ChangedNameHow.MARRIAGE_CERTIFICATE],
      };

      const step = preSubmissionSequence.find(obj => obj.url === APPLY_FINANCIAL_ORDER) as Step;
      expect(step.getNextStep(caseData)).toBe(CHECK_JOINT_APPLICATION);
    });
  });

  describe('APPLY_FINANCIAL_ORDER_DETAILS', () => {
    test('applicant2ApplyForFinancialOrder - YES', () => {
      const caseData = {
        applicant2ApplyForFinancialOrder: YesOrNo.YES,
        applicant2NameChangedHow: [ChangedNameHow.OTHER],
      };

      const step = preSubmissionSequence.find(obj => obj.url === APPLY_FINANCIAL_ORDER) as Step;
      expect(step.getNextStep(caseData)).toBe(APPLY_FINANCIAL_ORDER_DETAILS);
    });
  });
});
