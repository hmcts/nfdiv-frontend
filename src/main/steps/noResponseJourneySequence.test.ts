import { NoResponseCheckContactDetails, YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { noResponseJourneySequence } from './noResponseJourneySequence';
import {
  DEEMED_SERVICE_APPLICATION,
  EVIDENCE_RECEIVED_APPLICATION,
  HAVE_THEY_RECEIVED,
  HAVE_THEY_RECEIVED_REPRESENTED,
  NEW_POSTAL_AND_EMAIL,
  NO_NEW_ADDRESS,
  OPTIONS_FOR_PROGRESSING,
  SERVE_AGAIN,
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
});
