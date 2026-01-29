import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { preSubmissionSequence } from './applicant2Sequence';
import { CHECK_JOINT_APPLICATION, MONEY_PROPERTY, UPLOAD_YOUR_DOCUMENTS, WHO_IS_THE_FINANCIAL_ORDER_FOR } from './urls';

describe('Applicant 2 Sequence test', () => {
  describe('MONEY_PROPERTY', () => {
    test('applicant2ApplyForFinancialOrder - YES & name has changed', () => {
      const caseData = {
        applicant2ApplyForFinancialOrder: YesOrNo.YES,
        applicant2NameDifferentToMarriageCertificate: YesOrNo.YES,
      };

      const step = preSubmissionSequence.find(obj => obj.url === MONEY_PROPERTY) as Step;
      expect(step.getNextStep(caseData)).toBe(WHO_IS_THE_FINANCIAL_ORDER_FOR);
    });

    test('applicant2ApplyForFinancialOrder - YES & name has not changed', () => {
      const caseData = {
        applicant2ApplyForFinancialOrder: YesOrNo.YES,
        applicant2NameDifferentToMarriageCertificate: YesOrNo.NO,
      };

      const step = preSubmissionSequence.find(obj => obj.url === MONEY_PROPERTY) as Step;
      expect(step.getNextStep(caseData)).toBe(WHO_IS_THE_FINANCIAL_ORDER_FOR);
    });

    test('applicant2ApplyForFinancialOrder - NO & name has not changed', () => {
      const caseData = {
        applicant2ApplyForFinancialOrder: YesOrNo.NO,
        applicant2NameDifferentToMarriageCertificate: YesOrNo.NO,
      };

      const step = preSubmissionSequence.find(obj => obj.url === MONEY_PROPERTY) as Step;
      expect(step.getNextStep(caseData)).toBe(CHECK_JOINT_APPLICATION);
    });

    test('applicant2ApplyForFinancialOrder - NO & name has changed', () => {
      const caseData = {
        applicant2ApplyForFinancialOrder: YesOrNo.NO,
        applicant2NameDifferentToMarriageCertificate: YesOrNo.YES,
      };

      const step = preSubmissionSequence.find(obj => obj.url === MONEY_PROPERTY) as Step;
      expect(step.getNextStep(caseData)).toBe(UPLOAD_YOUR_DOCUMENTS);
    });
  });

  describe('WHO_IS_THE_FINANCIAL_ORDER_FOR', () => {
    test('applicant2NameChangedHow - deed poll', () => {
      const caseData = {
        applicant2NameDifferentToMarriageCertificate: YesOrNo.YES,
      };

      const step = preSubmissionSequence.find(obj => obj.url === WHO_IS_THE_FINANCIAL_ORDER_FOR) as Step;
      expect(step.getNextStep(caseData)).toBe(UPLOAD_YOUR_DOCUMENTS);
    });

    test('applicant2 name has not changed', () => {
      const caseData = {
        applicant2NameDifferentToMarriageCertificate: YesOrNo.NO,
      };

      const step = preSubmissionSequence.find(obj => obj.url === WHO_IS_THE_FINANCIAL_ORDER_FOR) as Step;
      expect(step.getNextStep(caseData)).toBe(CHECK_JOINT_APPLICATION);
    });

    test('applicant2 name has changed', () => {
      const caseData = {
        applicant2NameDifferentToMarriageCertificate: YesOrNo.YES,
      };

      const step = preSubmissionSequence.find(obj => obj.url === WHO_IS_THE_FINANCIAL_ORDER_FOR) as Step;
      expect(step.getNextStep(caseData)).toBe(UPLOAD_YOUR_DOCUMENTS);
    });
  });
});
