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

export const noResponseJourneyNextStep = (userCase: Partial<CaseWithId>, currentPage: PageLink): PageLink => {
  switch (currentPage) {
    case OPTIONS_FOR_PROGRESSING: {
      return userCase?.applicant2SolicitorRepresented === YesOrNo.YES
        ? HAVE_THEY_RECEIVED_REPRESENTED
        : HAVE_THEY_RECEIVED;
    }
    case HAVE_THEY_RECEIVED: {
      switch (userCase.noResponseCheckContactDetails) {
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
    }
    case EVIDENCE_RECEIVED_APPLICATION: {
      return userCase.noResponsePartnerHasReceivedPapers === YesOrNo.YES ? DEEMED_SERVICE_APPLICATION : SERVE_AGAIN;
    }
    default: {
      return HUB_PAGE;
    }
  }
};

export const noResponseJourneyOptions: Step[] = [
  {
    url: OPTIONS_FOR_PROGRESSING,
    getNextStep: data => noResponseJourneyNextStep(data, OPTIONS_FOR_PROGRESSING),
  },
  {
    url: HAVE_THEY_RECEIVED,
    getNextStep: data => noResponseJourneyNextStep(data, HAVE_THEY_RECEIVED),
  },
  {
    url: HAVE_THEY_RECEIVED_REPRESENTED,
    getNextStep: () => EVIDENCE_RECEIVED_APPLICATION,
  },
  {
    url: EVIDENCE_RECEIVED_APPLICATION,
    getNextStep: data => noResponseJourneyNextStep(data, EVIDENCE_RECEIVED_APPLICATION),
  },
];
