import { Checkbox } from '../app/case/case';
import { State, YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { postSubmissionSequence, preSubmissionSequence } from './applicant2Sequence';
import { sequence } from './respondentSequence';
import {
  ADDRESS_PRIVATE,
  CHECK_CONTACT_DETAILS,
  CHECK_JOINT_APPLICATION,
  ENTER_YOUR_ADDRESS,
  IN_REFUGE,
  MONEY_PROPERTY,
  UPDATE_ADDRESS_PRIVATE,
  UPDATE_IN_REFUGE,
  UPLOAD_YOUR_DOCUMENTS,
  WHO_IS_THE_FINANCIAL_ORDER_FOR,
} from './urls';

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
  describe('ADDRESS_PRIVATE', () => {
    const step = preSubmissionSequence.find(obj => obj.url === ADDRESS_PRIVATE) as Step;

    test('routes to in refuge when applicant2 address is private', () => {
      const caseData = {
        applicant2AddressPrivate: YesOrNo.YES,
        state: State.Submitted,
        applicant2IConfirmPrayer: Checkbox.Checked,
        applicant2StatementOfTruth: Checkbox.Checked,
      };

      expect(step.getNextStep(caseData)).toBe(IN_REFUGE);
    });

    test('routes to check contact details when applicant2 address is not private and applicant has confirmed', () => {
      const caseData = {
        applicant2AddressPrivate: YesOrNo.NO,
        state: State.Submitted,
        applicant2IConfirmPrayer: Checkbox.Checked,
        applicant2StatementOfTruth: Checkbox.Checked,
      };

      expect(step.getNextStep(caseData)).toBe(CHECK_CONTACT_DETAILS);
    });

    test('routes to enter your address when applicant2 address is not private and case is still draft', () => {
      const caseData = {
        applicant2AddressPrivate: YesOrNo.NO,
        state: State.Draft,
        applicant2IConfirmPrayer: Checkbox.Checked,
        applicant2StatementOfTruth: Checkbox.Checked,
      };

      expect(step.getNextStep(caseData)).toBe(ENTER_YOUR_ADDRESS);
    });
  });
  describe('Applicant2 UPDATE_ADDRESS_PRIVATE', () => {
    const step = postSubmissionSequence.find(obj => obj.url === UPDATE_ADDRESS_PRIVATE) as Step;

    test('routes to in refuge when address is private', () => {
      const caseData = {
        applicant2AddressPrivate: YesOrNo.YES,
      };

      expect(step.getNextStep(caseData)).toBe(UPDATE_IN_REFUGE);
    });

    test('routes to check contact details when address is not private', () => {
      const caseData = {
        applicant2AddressPrivate: YesOrNo.NO,
      };

      expect(step.getNextStep(caseData)).toBe(CHECK_CONTACT_DETAILS);
    });
  });
  describe('Respondent UPDATE_IN_REFUGE', () => {
    const step = sequence.find(obj => obj.url === UPDATE_IN_REFUGE) as Step;

    test('routes to in refuge when address is private', () => {
      const caseData = {
        applicant2InRefuge: YesOrNo.YES,
      };

      expect(step.getNextStep(caseData)).toBe(CHECK_CONTACT_DETAILS);
    });

    test('routes to check contact details when address is not private', () => {
      const caseData = {
        applicant2InRefuge: YesOrNo.NO,
      };

      expect(step.getNextStep(caseData)).toBe(CHECK_CONTACT_DETAILS);
    });
  });
});
