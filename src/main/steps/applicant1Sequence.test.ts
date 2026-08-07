import { Checkbox } from '../app/case/case';
import { ApplicationType, State, YesOrNo } from '../app/case/definition';

import { Step, applicant1PreSubmissionSequence, isCountryUk } from './applicant1Sequence';
import {
  ADDRESS_PRIVATE,
  CHECK_CONTACT_DETAILS,
  ENTER_THEIR_ADDRESS,
  ENTER_YOUR_ADDRESS,
  IN_REFUGE,
  MONEY_PROPERTY,
  OTHER_COURT_CASES,
  UPLOAD_YOUR_DOCUMENTS,
  WHO_IS_THE_FINANCIAL_ORDER_FOR,
  YOU_NEED_TO_SERVE,
} from './urls';

describe('Applicant 1 Sequence test', () => {
  describe('ENTER_THEIR_ADDRESS', () => {
    const caseData = {
      applicationType: ApplicationType.SOLE_APPLICATION,
      applicant2AddressCountry: 'United Kingdom',
    };

    test('Applicant 2 Country - United Kingdom', () => {
      const step = applicant1PreSubmissionSequence.find(obj => obj.url === ENTER_THEIR_ADDRESS) as Step;
      expect(step.getNextStep(caseData)).toBe(OTHER_COURT_CASES);
    });

    test('Applicant 2 Country - u.k', () => {
      caseData.applicant2AddressCountry = 'u.k';
      const step = applicant1PreSubmissionSequence.find(obj => obj.url === ENTER_THEIR_ADDRESS) as Step;
      expect(step.getNextStep(caseData)).toBe(OTHER_COURT_CASES);
    });

    test('Applicant 2 Country - France', () => {
      caseData.applicant2AddressCountry = 'France';
      const step = applicant1PreSubmissionSequence.find(obj => obj.url === ENTER_THEIR_ADDRESS) as Step;
      expect(step.getNextStep(caseData)).toBe(YOU_NEED_TO_SERVE);
    });
  });

  describe('MONEY_PROPERTY', () => {
    test('applicant1ApplyForFinancialOrder - YES', () => {
      const caseData = {
        applicant1ApplyForFinancialOrder: YesOrNo.YES,
      };

      const step = applicant1PreSubmissionSequence.find(obj => obj.url === MONEY_PROPERTY) as Step;
      expect(step.getNextStep(caseData)).toBe(WHO_IS_THE_FINANCIAL_ORDER_FOR);
    });

    test('applicant1ApplyForFinancialOrder - NO', () => {
      const caseData = {
        applicant1ApplyForFinancialOrder: YesOrNo.NO,
      };

      const step = applicant1PreSubmissionSequence.find(obj => obj.url === MONEY_PROPERTY) as Step;
      expect(step.getNextStep(caseData)).toBe(UPLOAD_YOUR_DOCUMENTS);
    });
  });
});

describe('isCountryUk test', () => {
  test('True UK terms', () => {
    const ukTermsTest = ['uk', 'unitedkingdom', 'u.k', 'u.k.'];
    for (const term of ukTermsTest) {
      expect(isCountryUk(term)).toBe(true);
    }
  });

  test('False UK term', () => {
    const nonUkCountry = 'France';
    expect(isCountryUk(nonUkCountry)).toBe(false);
  });

  test('Undefined country', () => {
    expect(isCountryUk(undefined)).toBe(false);
  });
  describe('ADDRESS_PRIVATE', () => {
    const step = applicant1PreSubmissionSequence.find(obj => obj.url === ADDRESS_PRIVATE) as Step;

    test('routes to in refuge when address is private', () => {
      const caseData = {
        applicant1AddressPrivate: YesOrNo.YES,
        state: State.Submitted,
        applicant1IConfirmPrayer: Checkbox.Checked,
        applicant1StatementOfTruth: Checkbox.Checked,
      };

      expect(step.getNextStep(caseData)).toBe(IN_REFUGE);
    });

    test('routes to check contact details when address is not private and applicant has confirmed', () => {
      const caseData = {
        applicant1AddressPrivate: YesOrNo.NO,
        state: State.Submitted,
        applicant1IConfirmPrayer: Checkbox.Checked,
        applicant1StatementOfTruth: Checkbox.Checked,
      };

      expect(step.getNextStep(caseData)).toBe(CHECK_CONTACT_DETAILS);
    });

    test('routes to enter your address when address is not private and case is still draft', () => {
      const caseData = {
        applicant1AddressPrivate: YesOrNo.NO,
        state: State.Draft,
        applicant1IConfirmPrayer: Checkbox.Checked,
        applicant1StatementOfTruth: Checkbox.Checked,
      };

      expect(step.getNextStep(caseData)).toBe(ENTER_YOUR_ADDRESS);
    });
  });
});
