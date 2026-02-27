import { NoResponseSearchOrDispense, YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { noRespondentAddressJourneySequence } from './noRespondentAddressJourneySequence';
import {
  ALTERNATIVE_SERVICE_APPLICATION,
  DISPENSE_SERVICE_APPLICATION,
  NO_RESP_ADDRESS_ENTER_ADDRESS,
  NO_RESP_ADDRESS_GOV_SEARCH_POSSIBLE,
  NO_RESP_ADDRESS_HAVE_DIFFERENT_WAY_TO_CONTACT,
  NO_RESP_ADDRESS_HAVE_FOUND_ADDRESS,
  NO_RESP_ADDRESS_IS_PARTNER_ABROAD,
  NO_RESP_ADDRESS_PROGRESS_WITHOUT_ADDRESS,
  NO_RESP_ADDRESS_SEARCHING_FOR_DETAILS,
  NO_RESP_ADDRESS_WILL_APPLY_TO_SEND_PAPERS,
  SEARCH_GOV_RECORDS_APPLICATION,
} from './urls';

describe('No Response Journey Sequence test', () => {
  describe('NO_RESP_ADDRESS_PROGRESS_WITHOUT_ADDRESS', () => {
    test('NO_RESP_ADDRESS_HAVE_FOUND_ADDRESS', () => {
      const caseData = {
        applicant2SolicitorRepresented: YesOrNo.NO,
        applicant2AddressPrivate: YesOrNo.NO,
      };
      const step = noRespondentAddressJourneySequence.find(
        obj => obj.url === NO_RESP_ADDRESS_PROGRESS_WITHOUT_ADDRESS
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(NO_RESP_ADDRESS_HAVE_FOUND_ADDRESS);
    });
  });

  describe('NO_RESP_ADDRESS_HAVE_FOUND_ADDRESS', () => {
    test('NO_RESP_ADDRESS_ENTER_ADDRESS if the address has been found', () => {
      const caseData = {
        applicant1NoRespAddressHasFoundAddress: YesOrNo.YES,
      };
      const step = noRespondentAddressJourneySequence.find(
        obj => obj.url === NO_RESP_ADDRESS_HAVE_FOUND_ADDRESS
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(NO_RESP_ADDRESS_ENTER_ADDRESS);
    });

    test('NO_RESP_ADDRESS_HAVE_DIFFERENT_WAY_TO_CONTACT if the address has not been found', () => {
      const caseData = {
        applicant1NoRespAddressHasFoundAddress: YesOrNo.NO,
      };
      const step = noRespondentAddressJourneySequence.find(
        obj => obj.url === NO_RESP_ADDRESS_HAVE_FOUND_ADDRESS
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(NO_RESP_ADDRESS_HAVE_DIFFERENT_WAY_TO_CONTACT);
    });
  });

  describe('NO_RESP_ADDRESS_HAVE_DIFFERENT_WAY_TO_CONTACT', () => {
    test('NO_RESP_ADDRESS_WILL_APPLY_TO_SEND_PAPERS if has different way to contact', () => {
      const caseData = {
        applicant1NoRespAddressHasWayToContact: YesOrNo.YES,
      };
      const step = noRespondentAddressJourneySequence.find(
        obj => obj.url === NO_RESP_ADDRESS_HAVE_DIFFERENT_WAY_TO_CONTACT
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(NO_RESP_ADDRESS_WILL_APPLY_TO_SEND_PAPERS);
    });

    test('NO_RESP_ADDRESS_SEARCHING_FOR_DETAILS if does not have different way to contact', () => {
      const caseData = {
        applicant1NoRespAddressHasWayToContact: YesOrNo.NO,
      };
      const step = noRespondentAddressJourneySequence.find(
        obj => obj.url === NO_RESP_ADDRESS_HAVE_DIFFERENT_WAY_TO_CONTACT
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(NO_RESP_ADDRESS_SEARCHING_FOR_DETAILS);
    });
  });

  describe('NO_RESP_ADDRESS_WILL_APPLY_TO_SEND_PAPERS', () => {
    test('ALTERNATIVE_SERVICE_APPLICATION if will apply', () => {
      const caseData = {
        applicant1NoRespAddressWillApplyAltService: YesOrNo.YES,
      };
      const step = noRespondentAddressJourneySequence.find(
        obj => obj.url === NO_RESP_ADDRESS_WILL_APPLY_TO_SEND_PAPERS
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(ALTERNATIVE_SERVICE_APPLICATION);
    });

    test('NO_RESP_ADDRESS_SEARCHING_FOR_DETAILS if will not apply', () => {
      const caseData = {
        applicant1NoRespAddressWillApplyAltService: YesOrNo.NO,
      };
      const step = noRespondentAddressJourneySequence.find(
        obj => obj.url === NO_RESP_ADDRESS_WILL_APPLY_TO_SEND_PAPERS
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(NO_RESP_ADDRESS_SEARCHING_FOR_DETAILS);
    });
  });

  describe('NO_RESP_ADDRESS_SEARCHING_FOR_DETAILS', () => {
    test('IS_PARTNER_ABROAD if continue with no address', () => {
      const step = noRespondentAddressJourneySequence.find(
        obj => obj.url === NO_RESP_ADDRESS_SEARCHING_FOR_DETAILS
      ) as Step;
      expect(step.getNextStep({})).toBe(NO_RESP_ADDRESS_IS_PARTNER_ABROAD);
    });
  });

  describe('NO_RESP_ADDRESS_IS_PARTNER_ABROAD', () => {
    test('DISPENSE_SERVICE_APPLICATION', () => {
      const caseData = {
        applicant1NoResponsePartnerInUkOrReceivingBenefits: YesOrNo.NO,
      };
      const step = noRespondentAddressJourneySequence.find(
        obj => obj.url === NO_RESP_ADDRESS_IS_PARTNER_ABROAD
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(DISPENSE_SERVICE_APPLICATION);
    });

    test('NO_RESP_ADDRESS_GOV_SEARCH_POSSIBLE', () => {
      const caseData = {
        applicant1NoResponsePartnerInUkOrReceivingBenefits: YesOrNo.YES,
      };
      const step = noRespondentAddressJourneySequence.find(
        obj => obj.url === NO_RESP_ADDRESS_IS_PARTNER_ABROAD
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(NO_RESP_ADDRESS_GOV_SEARCH_POSSIBLE);
    });
  });

  describe('NO_RESP_ADDRESS_GOV_SEARCH_POSSIBLE', () => {
    test('SEARCH_GOV_RECORDS_APPLICATION', () => {
      const caseData = {
        applicant1NoResponseSearchOrDispense: NoResponseSearchOrDispense.SEARCH,
      };
      const step = noRespondentAddressJourneySequence.find(
        obj => obj.url === NO_RESP_ADDRESS_GOV_SEARCH_POSSIBLE
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(SEARCH_GOV_RECORDS_APPLICATION);
    });

    test('DISPENSE_SERVICE_APPLICATION', () => {
      const caseData = {
        applicant1NoResponseSearchOrDispense: NoResponseSearchOrDispense.DISPENSE,
      };
      const step = noRespondentAddressJourneySequence.find(
        obj => obj.url === NO_RESP_ADDRESS_GOV_SEARCH_POSSIBLE
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(DISPENSE_SERVICE_APPLICATION);
    });
  });
});
