import { CaseWithId } from '../app/case/case';
import {
  NoResponseCheckContactDetails,
  NoResponseNoNewAddressDetails,
  NoResponseProcessServerOrBailiff,
  YesOrNo,
} from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  ALTERNATIVE_SERVICE_APPLICATION,
  BAILIFF_SERVICE_APPLICATION,
  CHECK_DETAILS_PROCESS_SERVER,
  DEEMED_SERVICE_APPLICATION,
  EVIDENCE_RECEIVED_APPLICATION,
  HAVE_THEY_RECEIVED,
  HAVE_THEY_RECEIVED_REPRESENTED,
  HUB_PAGE,
  NEW_POSTAL_AND_EMAIL,
  NO_NEW_ADDRESS,
  OPTIONS_FOR_PROGRESSING,
  OWN_SEARCHES,
  PARTNER_IN_PERSON,
  PROCESS_SERVER,
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
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      switch (data.applicant1NoResponseNoNewAddressDetails) {
        case NoResponseNoNewAddressDetails.IN_PERSON_SERVICE: {
          return PARTNER_IN_PERSON;
        }
        case NoResponseNoNewAddressDetails.ALTERNATIVE_SERVICE: {
          return ALTERNATIVE_SERVICE_APPLICATION;
        }
        case NoResponseNoNewAddressDetails.NO_CONTACT_DETAILS: {
          return OWN_SEARCHES;
        }
        default: {
          return HUB_PAGE;
        }
      }
    },
  },
  {
    url: PARTNER_IN_PERSON,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      switch (data.applicant1NoResponseProcessServerOrBailiff) {
        case NoResponseProcessServerOrBailiff.PROCESS_SERVER: {
          return PROCESS_SERVER;
        }
        case NoResponseProcessServerOrBailiff.COURT_BAILIFF: {
          return BAILIFF_SERVICE_APPLICATION;
        }
        default: {
          return HUB_PAGE;
        }
      }
    },
  },
  {
    url: PROCESS_SERVER,
    getNextStep: () => CHECK_DETAILS_PROCESS_SERVER,
  },
];
