import {
  NoResponseCheckContactDetails,
  NoResponseOwnSearches,
  NoResponsePartnerNewEmailOrPostalAddress,
  NoResponseProcessServerOrBailiff,
  NoResponseProvidePartnerNewEmailOrAlternativeService,
  NoResponseSearchOrDispense,
  YesOrNo,
} from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { noResponseJourneySequence } from './noResponseJourneySequence';
import {
  ALTERNATIVE_SERVICE_APPLICATION,
  BAILIFF_SERVICE_APPLICATION,
  DEEMED_SERVICE_APPLICATION,
  DISPENSE_SERVICE_APPLICATION,
  EVIDENCE_RECEIVED_APPLICATION,
  GOV_SEARCH_POSSIBLE,
  HAVE_THEY_RECEIVED,
  HAVE_THEY_RECEIVED_REPRESENTED,
  HUB_PAGE,
  IS_PARTNER_ABROAD,
  NEW_CONTACT_DETAIL_CHECK_ANSWERS,
  NEW_EMAIL,
  NEW_POSTAL_ADDRESS,
  NEW_POSTAL_AND_EMAIL,
  NO_NEW_ADDRESS,
  NO_RESPONSE_DETAILS_UPDATED,
  OPTIONS_FOR_PROGRESSING,
  OWN_SEARCHES,
  PARTNER_IN_PERSON,
  PROCESS_SERVER,
  PROCESS_SERVER_DOCS,
  PROVIDE_NEW_EMAIL_ADDRESS,
  SEARCH_GOV_RECORDS_APPLICATION,
  SEARCH_TIPS,
  SERVE_AGAIN,
  SUCCESS_SCREEN_PROCESS_SERVER,
} from './urls';

describe('No Response Journey Sequence test', () => {
  describe('OPTIONS_FOR_PROGRESSING', () => {
    test('Applicant 2 Not Represented', () => {
      const caseData = {
        applicant2SolicitorRepresented: YesOrNo.NO,
        applicant2AddressPrivate: YesOrNo.NO,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === OPTIONS_FOR_PROGRESSING) as Step;
      expect(step.getNextStep(caseData)).toBe(HAVE_THEY_RECEIVED);
    });

    test('Applicant 2 Not Represented and Private', () => {
      const caseData = {
        applicant2SolicitorRepresented: YesOrNo.NO,
        applicant2AddressPrivate: YesOrNo.YES,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === OPTIONS_FOR_PROGRESSING) as Step;
      expect(step.getNextStep(caseData)).toBe(EVIDENCE_RECEIVED_APPLICATION);
    });

    test('Applicant 2 Represented', () => {
      const caseData = {
        applicant2SolicitorRepresented: YesOrNo.YES,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === OPTIONS_FOR_PROGRESSING) as Step;
      expect(step.getNextStep(caseData)).toBe(HAVE_THEY_RECEIVED_REPRESENTED);
    });
  });

  describe('HAVE_THEY_RECEIVED', () => {
    test('UP_TO_DATE', () => {
      const caseData = {
        applicant1NoResponseCheckContactDetails: NoResponseCheckContactDetails.UP_TO_DATE,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === HAVE_THEY_RECEIVED) as Step;
      expect(step.getNextStep(caseData)).toBe(EVIDENCE_RECEIVED_APPLICATION);
    });

    test('NEW_ADDRESS', () => {
      const caseData = {
        applicant1NoResponseCheckContactDetails: NoResponseCheckContactDetails.NEW_ADDRESS,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === HAVE_THEY_RECEIVED) as Step;
      expect(step.getNextStep(caseData)).toBe(NEW_POSTAL_AND_EMAIL);
    });

    test('NOT_KNOWN', () => {
      const caseData = {
        applicant1NoResponseCheckContactDetails: NoResponseCheckContactDetails.NOT_KNOWN,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === HAVE_THEY_RECEIVED) as Step;
      expect(step.getNextStep(caseData)).toBe(NO_NEW_ADDRESS);
    });
  });

  describe('HAVE_THEY_RECEIVED_REPRESENTED', () => {
    test('HAVE_THEY_RECEIVED_REPRESENTED', () => {
      const step = noResponseJourneySequence.find(obj => obj.url === HAVE_THEY_RECEIVED_REPRESENTED) as Step;
      expect(step.getNextStep({})).toBe(EVIDENCE_RECEIVED_APPLICATION);
    });
  });

  describe('EVIDENCE_RECEIVED_APPLICATION', () => {
    test('applicant1NoResponsePartnerHasReceivedPapers', () => {
      const caseData = {
        applicant1NoResponsePartnerHasReceivedPapers: YesOrNo.YES,
        applicant2AddressOverseas: YesOrNo.NO,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === EVIDENCE_RECEIVED_APPLICATION) as Step;
      expect(step.getNextStep(caseData)).toBe(DEEMED_SERVICE_APPLICATION);
    });

    test('NOT applicant1NoResponsePartnerHasReceivedPapers', () => {
      const caseData = {
        applicant1NoResponsePartnerHasReceivedPapers: YesOrNo.NO,
        applicant2AddressOverseas: YesOrNo.NO,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === EVIDENCE_RECEIVED_APPLICATION) as Step;
      expect(step.getNextStep(caseData)).toBe(SERVE_AGAIN);
    });

    test('NOT applicant1NoResponsePartnerHasReceivedPapers and applicant2AddressOverseas', () => {
      const caseData = {
        applicant1NoResponsePartnerHasReceivedPapers: YesOrNo.NO,
        applicant2AddressOverseas: YesOrNo.YES,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === EVIDENCE_RECEIVED_APPLICATION) as Step;
      expect(step.getNextStep(caseData)).toBe(NO_NEW_ADDRESS);
    });
  });

  describe('PARTNER_IN_PERSON', () => {
    test('PROCESS_SERVER', () => {
      const caseData = {
        applicant1NoResponseProcessServerOrBailiff: NoResponseProcessServerOrBailiff.PROCESS_SERVER,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === PARTNER_IN_PERSON) as Step;
      expect(step.getNextStep(caseData)).toBe(PROCESS_SERVER);
    });

    test('COURT_BAILIFF', () => {
      const caseData = {
        applicant1NoResponseProcessServerOrBailiff: NoResponseProcessServerOrBailiff.COURT_BAILIFF,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === PARTNER_IN_PERSON) as Step;
      expect(step.getNextStep(caseData)).toBe(BAILIFF_SERVICE_APPLICATION);
    });
  });

  describe('PROCESS_SERVER', () => {
    test('PROCESS_SERVER', () => {
      const step = noResponseJourneySequence.find(obj => obj.url === PROCESS_SERVER) as Step;
      expect(step.getNextStep({})).toBe(SUCCESS_SCREEN_PROCESS_SERVER);
    });

    test('SUCCESS_SCREEN_PROCESS_SERVER', () => {
      const step = noResponseJourneySequence.find(obj => obj.url === SUCCESS_SCREEN_PROCESS_SERVER) as Step;
      expect(step.getNextStep({})).toBe(PROCESS_SERVER_DOCS);
    });
  });

  describe('OWN_SEARCHES', () => {
    test('IS_PARTNER_ABROAD', () => {
      const caseData = {
        applicant1NoResponseOwnSearches: NoResponseOwnSearches.YES,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === OWN_SEARCHES) as Step;
      expect(step.getNextStep(caseData)).toBe(IS_PARTNER_ABROAD);
    });

    test('IS_PARTNER_ABROAD (NOT_FOUND)', () => {
      const caseData = {
        applicant1NoResponseOwnSearches: NoResponseOwnSearches.NOT_FOUND,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === OWN_SEARCHES) as Step;
      expect(step.getNextStep(caseData)).toBe(IS_PARTNER_ABROAD);
    });

    test('SEARCH_TIPS', () => {
      const caseData = {
        applicant1NoResponseOwnSearches: NoResponseOwnSearches.NO,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === OWN_SEARCHES) as Step;
      expect(step.getNextStep(caseData)).toBe(SEARCH_TIPS);
    });
  });

  describe('IS_PARTNER_ABROAD', () => {
    test('DISPENSE_SERVICE_APPLICATION', () => {
      const caseData = {
        applicant1NoResponsePartnerInUkOrReceivingBenefits: YesOrNo.NO,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === IS_PARTNER_ABROAD) as Step;
      expect(step.getNextStep(caseData)).toBe(DISPENSE_SERVICE_APPLICATION);
    });

    test('GOV_SEARCH_POSSIBLE', () => {
      const caseData = {
        applicant1NoResponsePartnerInUkOrReceivingBenefits: YesOrNo.YES,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === IS_PARTNER_ABROAD) as Step;
      expect(step.getNextStep(caseData)).toBe(GOV_SEARCH_POSSIBLE);
    });
  });

  describe('GOV_SEARCH_POSSIBLE', () => {
    test('SEARCH_GOV_RECORDS_APPLICATION', () => {
      const caseData = {
        applicant1NoResponseSearchOrDispense: NoResponseSearchOrDispense.SEARCH,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === GOV_SEARCH_POSSIBLE) as Step;
      expect(step.getNextStep(caseData)).toBe(SEARCH_GOV_RECORDS_APPLICATION);
    });

    test('DISPENSE_SERVICE_APPLICATION', () => {
      const caseData = {
        applicant1NoResponseSearchOrDispense: NoResponseSearchOrDispense.DISPENSE,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === GOV_SEARCH_POSSIBLE) as Step;
      expect(step.getNextStep(caseData)).toBe(DISPENSE_SERVICE_APPLICATION);
    });
  });

  describe('SEARCH_TIPS', () => {
    test('SEARCH_TIPS', () => {
      const step = noResponseJourneySequence.find(obj => obj.url === SEARCH_TIPS) as Step;
      expect(step.getNextStep({})).toBe(HUB_PAGE);
    });
  });

  describe('UPDATE_RESPONDENT_CONTACT_DETAILS', () => {
    test('UPDATE_POSTAL_AND_EMAIL_ADDRESS', () => {
      const caseData = {
        applicant1NoResponseCheckContactDetails: NoResponseCheckContactDetails.NEW_ADDRESS,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === HAVE_THEY_RECEIVED) as Step;
      expect(step.getNextStep(caseData)).toBe(NEW_POSTAL_AND_EMAIL);
    });
    test('NEW_POSTAL_ADDRESS', () => {
      const caseData = {
        applicant1NoResponsePartnerNewEmailOrPostalAddress: NoResponsePartnerNewEmailOrPostalAddress.NEW_POSTAL,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === NEW_POSTAL_AND_EMAIL) as Step;
      expect(step.getNextStep(caseData)).toBe(NEW_POSTAL_ADDRESS);
    });
    test('NEW_EMAIL_ADDRESS', () => {
      const caseData = {
        applicant1NoResponsePartnerNewEmailOrPostalAddress: NoResponsePartnerNewEmailOrPostalAddress.NEW_EMAIL,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === NEW_POSTAL_AND_EMAIL) as Step;
      expect(step.getNextStep(caseData)).toBe(NEW_EMAIL);
    });
    test('BOTH_NEW_EMAIL_AND_POSTAL_ADDRESS_UPDATE_POSTAL_ADDRESS', () => {
      const caseData = {
        applicant1NoResponsePartnerNewEmailOrPostalAddress:
          NoResponsePartnerNewEmailOrPostalAddress.BOTH_EMAIL_AND_POSTAL,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === NEW_POSTAL_AND_EMAIL) as Step;
      expect(step.getNextStep(caseData)).toBe(NEW_EMAIL);
    });
    test('BOTH_NEW_EMAIL_AND_POSTAL_ADDRESS_UPDATE_EMAIL', () => {
      const caseData = {
        applicant1NoResponsePartnerNewEmailOrPostalAddress:
          NoResponsePartnerNewEmailOrPostalAddress.BOTH_EMAIL_AND_POSTAL,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === NEW_EMAIL) as Step;
      expect(step.getNextStep(caseData)).toBe(PROVIDE_NEW_EMAIL_ADDRESS);
    });
    test('CHECK_YOUR_ANSWERS', () => {
      const caseData = {
        applicant1NoResponsePartnerNewEmailOrPostalAddress:
          NoResponsePartnerNewEmailOrPostalAddress.BOTH_EMAIL_AND_POSTAL,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === NEW_POSTAL_ADDRESS) as Step;
      expect(step.getNextStep(caseData)).toBe(NEW_CONTACT_DETAIL_CHECK_ANSWERS);
    });
    test('DETAILS_UPDATED', () => {
      const caseData = {
        applicant1NoResponsePartnerNewEmailOrPostalAddress:
          NoResponsePartnerNewEmailOrPostalAddress.BOTH_EMAIL_AND_POSTAL,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === NEW_CONTACT_DETAIL_CHECK_ANSWERS) as Step;
      expect(step.getNextStep(caseData)).toBe(NO_RESPONSE_DETAILS_UPDATED);
    });
    test('PROVIDE_NEW_EMAIL', () => {
      const caseData = {
        applicant1NoResponseProvidePartnerNewEmailOrAlternativeService:
          NoResponseProvidePartnerNewEmailOrAlternativeService.PROVIDE_NEW_EMAIL,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === NEW_EMAIL) as Step;
      expect(step.getNextStep(caseData)).toBe(PROVIDE_NEW_EMAIL_ADDRESS);
    });
    test('NEW_EMAIL_APPLY_FOR_ALTERNATIVE_SERVICE', () => {
      const caseData = {
        applicant1NoResponseProvidePartnerNewEmailOrAlternativeService:
          NoResponseProvidePartnerNewEmailOrAlternativeService.APPLY_FOR_ALTERNATIVE_SERVICE,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === NEW_EMAIL) as Step;
      expect(step.getNextStep(caseData)).toBe(ALTERNATIVE_SERVICE_APPLICATION);
    });
    test('NEW_POSTAL_ADDRESS_CHECK_YOUR_ANSWERS', () => {
      const caseData = {
        applicant1NoResponsePartnerNewEmailOrPostalAddress: NoResponsePartnerNewEmailOrPostalAddress.NEW_POSTAL,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === NEW_POSTAL_ADDRESS) as Step;
      expect(step.getNextStep(caseData)).toBe(NEW_CONTACT_DETAIL_CHECK_ANSWERS);
    });
    test('DETAILS_UPDATED_HUB_PAGE', () => {
      const caseData = {};
      const step = noResponseJourneySequence.find(obj => obj.url === NO_RESPONSE_DETAILS_UPDATED) as Step;
      expect(step.getNextStep(caseData)).toBe(HUB_PAGE);
    });
  });
});
