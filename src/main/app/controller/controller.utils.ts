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
} from '../../steps/urls';
import { CaseWithId } from '../case/case';
import { NoResponseCheckContactDetails, YesOrNo } from '../case/definition';

export const needsToExplainDelay = (userCase: Partial<CaseWithId>): boolean => {
  return (
    userCase.isFinalOrderOverdue === YesOrNo.YES ||
    Boolean(userCase.applicant1FinalOrderLateExplanation) ||
    Boolean(userCase.applicant2FinalOrderLateExplanation)
  );
};

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
