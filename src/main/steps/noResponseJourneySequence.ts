import { CaseWithId } from '../app/case/case';
import { NoResponseCheckContactDetails, YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  DEEMED_SERVICE_APPLICATION,
  EVIDENCE_RECEIVED_APPLICATION,
  HAVE_THEY_RECEIVED,
  HAVE_THEY_RECEIVED_REPRESENTED,
  HUB_PAGE,
  NEW_POSTAL_AND_EMAIL,
  NO_NEW_ADDRESS,
  OPTIONS_FOR_PROGRESSING,
  PageLink,
  SERVE_AGAIN,
} from './urls';

export const noResponseJourneySequence: Step[] = [
  {
    url: OPTIONS_FOR_PROGRESSING,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      if (data?.applicant2SolicitorRepresented === YesOrNo.YES) {
        return HAVE_THEY_RECEIVED_REPRESENTED;
      }
      return data?.applicant2AddressPrivate === YesOrNo.YES ? EVIDENCE_RECEIVED_APPLICATION : HAVE_THEY_RECEIVED;
    },
  },
  {
    url: HAVE_THEY_RECEIVED,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      switch (data.applicant1NoResponseCheckContactDetails) {
        case NoResponseCheckContactDetails.UP_TO_DATE: {
          return EVIDENCE_RECEIVED_APPLICATION;
        }
        case NoResponseCheckContactDetails.NEW_ADDRESS: {
          return NEW_POSTAL_AND_EMAIL;
        }
        case NoResponseCheckContactDetails.NOT_KNOWN: {
          return NO_NEW_ADDRESS;
        }
        default: {
          return HUB_PAGE;
        }
      }
    },
  },
  {
    url: HAVE_THEY_RECEIVED_REPRESENTED,
    getNextStep: () => EVIDENCE_RECEIVED_APPLICATION,
  },
  {
    url: EVIDENCE_RECEIVED_APPLICATION,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      if (data?.applicant1NoResponsePartnerHasReceivedPapers === YesOrNo.YES) {
        return DEEMED_SERVICE_APPLICATION;
      }
      return data.applicant2AddressOverseas === YesOrNo.YES ? NO_NEW_ADDRESS : SERVE_AGAIN;
    },
  },
  {
    url: NO_NEW_ADDRESS,
    getNextStep: () => HUB_PAGE,
  },
];
