import {
  NoResponseCheckContactDetails,
  NoResponsePartnerNewEmailOrPostalAddress,
  NoResponseProvidePartnerNewEmailOrAlternativeService,
  NoResponseSendPapersAgainOrTrySomethingElse,
  YesOrNo,
} from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { noResponseJourneySequence } from './noResponseJourneySequence';
import {
  APPLY_FOR_ALTERNATIVE_SERVICE,
  DEEMED_SERVICE_APPLICATION,
  EVIDENCE_RECEIVED_APPLICATION,
  HAVE_THEY_RECEIVED,
  HAVE_THEY_RECEIVED_REPRESENTED,
  HUB_PAGE,
  NEW_CONTACT_DETAIL_CHECK_ANSWERS,
  NEW_EMAIL,
  NEW_POSTAL_ADDRESS,
  NEW_POSTAL_AND_EMAIL,
  NO_NEW_ADDRESS,
  NO_RESPONSE_DETAILS_UPDATED,
  OPTIONS_FOR_PROGRESSING,
  PROVIDE_NEW_EMAIL_ADDRESS,
  SERVE_AGAIN,
  WILL_SERVE_AGAIN,
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
      expect(step.getNextStep(caseData)).toBe(NEW_POSTAL_ADDRESS);
    });
    test('BOTH_NEW_EMAIL_AND_POSTAL_ADDRESS_UPDATE_EMAIL', () => {
      const caseData = {
        applicant1NoResponsePartnerNewEmailOrPostalAddress:
          NoResponsePartnerNewEmailOrPostalAddress.BOTH_EMAIL_AND_POSTAL,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === NEW_POSTAL_ADDRESS) as Step;
      expect(step.getNextStep(caseData)).toBe(PROVIDE_NEW_EMAIL_ADDRESS);
    });
    test('CHECK_YOUR_ANSWERS', () => {
      const caseData = {
        applicant1NoResponsePartnerNewEmailOrPostalAddress:
          NoResponsePartnerNewEmailOrPostalAddress.BOTH_EMAIL_AND_POSTAL,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === PROVIDE_NEW_EMAIL_ADDRESS) as Step;
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
      expect(step.getNextStep(caseData)).toBe(APPLY_FOR_ALTERNATIVE_SERVICE);
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
    test('WILL_SERVE_AGAIN_ADDRESS_PRIVATE', () => {
      const caseData = {
        applicant2AddressPrivate: YesOrNo.YES,
        applicant1NoResponseSendPapersAgainOrTrySomethingElse:
          NoResponseSendPapersAgainOrTrySomethingElse.SEND_PAPERS_AGAIN,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === SERVE_AGAIN) as Step;
      expect(step.getNextStep(caseData)).toBe(WILL_SERVE_AGAIN);
    });
    test('WILL_SERVE_AGAIN_ADDRESS_PUBLIC', () => {
      const caseData = {
        applicant1NoResponseSendPapersAgainOrTrySomethingElse:
          NoResponseSendPapersAgainOrTrySomethingElse.SEND_PAPERS_AGAIN,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === SERVE_AGAIN) as Step;
      expect(step.getNextStep(caseData)).toBe(NEW_CONTACT_DETAIL_CHECK_ANSWERS);
    });
    test('SERVE_AGAIN_TYR_SOMETHING_ELSE', () => {
      const caseData = {
        applicant1NoResponseSendPapersAgainOrTrySomethingElse:
          NoResponseSendPapersAgainOrTrySomethingElse.TRY_SOMETHING_ELSE,
      };
      const step = noResponseJourneySequence.find(obj => obj.url === SERVE_AGAIN) as Step;
      expect(step.getNextStep(caseData)).toBe(NO_NEW_ADDRESS);
    });
  });
});
