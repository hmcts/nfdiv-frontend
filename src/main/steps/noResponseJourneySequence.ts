import { CaseWithId } from '../app/case/case';
import {
  NoResponseCheckContactDetails,
  NoResponsePartnerNewEmailOrPostalAddress,
  NoResponsePartnerSendPapersAgainOrTrySomethingElse,
  NoResponseProvidePartnerNewEmailOrAlternativeService,
  YesOrNo,
} from '../app/case/definition';

import { Step } from './applicant1Sequence';
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
  PageLink,
  SERVE_AGAIN,
  WILL_SERVE_AGAIN,
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
    url: NEW_POSTAL_AND_EMAIL,
    getNextStep: (data: Partial<CaseWithId>): PageLink =>
      [
        NoResponsePartnerNewEmailOrPostalAddress.NEW_POSTAL,
        NoResponsePartnerNewEmailOrPostalAddress.BOTH_EMAIL_AND_POSTAL,
      ].includes(data.applicant1NoResponsePartnerNewEmailOrPostalAddress as NoResponsePartnerNewEmailOrPostalAddress)
        ? NEW_POSTAL_ADDRESS
        : NEW_EMAIL,
  },
  {
    url: NEW_POSTAL_ADDRESS,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      return data.applicant1NoResponsePartnerNewEmailOrPostalAddress ===
        NoResponsePartnerNewEmailOrPostalAddress.BOTH_EMAIL_AND_POSTAL
        ? PROVIDE_NEW_EMAIL_ADDRESS
        : NEW_CONTACT_DETAIL_CHECK_ANSWERS;
    },
  },
  {
    url: NEW_EMAIL,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      return data.applicant1NoResponseProvidePartnerNewEmailOrAlternativeService ===
        NoResponseProvidePartnerNewEmailOrAlternativeService.APPLY_FOR_ALTERNATIVE_SERVICE
        ? APPLY_FOR_ALTERNATIVE_SERVICE
        : PROVIDE_NEW_EMAIL_ADDRESS;
    },
  },
  {
    url: PROVIDE_NEW_EMAIL_ADDRESS,
    getNextStep: (): PageLink => {
      return NEW_CONTACT_DETAIL_CHECK_ANSWERS;
    },
  },
  {
    url: NEW_CONTACT_DETAIL_CHECK_ANSWERS,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      return data?.applicant1NoResponsePartnerSendPapersAgainOrTrySomethingElse ===
        NoResponsePartnerSendPapersAgainOrTrySomethingElse.SEND_PAPERS_AGAIN
        ? WILL_SERVE_AGAIN
        : NO_RESPONSE_DETAILS_UPDATED;
    },
  },
  {
    url: NO_RESPONSE_DETAILS_UPDATED,
    getNextStep: (): PageLink => {
      return HUB_PAGE;
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
    url: SERVE_AGAIN,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      if (
        data?.applicant1NoResponsePartnerSendPapersAgainOrTrySomethingElse ===
        NoResponsePartnerSendPapersAgainOrTrySomethingElse.SEND_PAPERS_AGAIN
      ) {
        return data?.applicant2AddressPrivate === YesOrNo.YES ? WILL_SERVE_AGAIN : NEW_CONTACT_DETAIL_CHECK_ANSWERS;
      } else {
        return NO_NEW_ADDRESS;
      }
    },
  },
];
