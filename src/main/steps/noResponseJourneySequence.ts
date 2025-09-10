import { CaseWithId } from '../app/case/case';
import {
  NoResponseCheckContactDetails,
  NoResponseNoNewAddressDetails,
  NoResponseOwnSearches,
  NoResponsePartnerNewEmailOrAddress,
  NoResponseProcessServerOrBailiff,
  NoResponseProvidePartnerNewEmailOrAlternativeService,
  NoResponseSearchOrDispense,
  NoResponseSendPapersAgainOrTrySomethingElse,
  YesOrNo,
} from '../app/case/definition';

import { Step } from './applicant1Sequence';
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
  PageLink,
  SEARCH_GOV_RECORDS_APPLICATION,
  SEARCH_TIPS,
  SERVE_AGAIN,
  SUCCESS_SCREEN_PROCESS_SERVER,
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
      data.applicant1NoResponsePartnerNewEmailOrAddress === NoResponsePartnerNewEmailOrAddress.EMAIL
        ? NEW_EMAIL
        : data.applicant1NoResponsePartnerNewEmailOrAddress === NoResponsePartnerNewEmailOrAddress.EMAIL_AND_ADDRESS
          ? PROVIDE_NEW_EMAIL_ADDRESS
          : NEW_POSTAL_ADDRESS,
  },
  {
    url: NEW_POSTAL_ADDRESS,
    getNextStep: (): PageLink => {
      return NEW_CONTACT_DETAIL_CHECK_ANSWERS;
    },
  },
  {
    url: NEW_EMAIL,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      return data.applicant1NoResponseProvidePartnerNewEmailOrAlternativeService ===
        NoResponseProvidePartnerNewEmailOrAlternativeService.APPLY_FOR_ALTERNATIVE_SERVICE
        ? ALTERNATIVE_SERVICE_APPLICATION
        : PROVIDE_NEW_EMAIL_ADDRESS;
    },
  },
  {
    url: PROVIDE_NEW_EMAIL_ADDRESS,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      return data.applicant1NoResponsePartnerNewEmailOrAddress === NoResponsePartnerNewEmailOrAddress.EMAIL_AND_ADDRESS
        ? NEW_POSTAL_ADDRESS
        : NEW_CONTACT_DETAIL_CHECK_ANSWERS;
    },
  },
  {
    url: NEW_CONTACT_DETAIL_CHECK_ANSWERS,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      return data?.applicant1NoResponseSendPapersAgainOrTrySomethingElse ===
        NoResponseSendPapersAgainOrTrySomethingElse.PAPERS_SENT
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
      return data.applicant2AddressOverseas === YesOrNo.YES ||
        data?.applicant1NoResponseSendPapersAgainOrTrySomethingElse ===
          NoResponseSendPapersAgainOrTrySomethingElse.PAPERS_SENT
        ? NO_NEW_ADDRESS
        : SERVE_AGAIN;
    },
  },
  {
    url: SERVE_AGAIN,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      const wantsToSendPapersAgain =
        data?.applicant1NoResponseSendPapersAgainOrTrySomethingElse !==
        NoResponseSendPapersAgainOrTrySomethingElse.TRY_SOMETHING_ELSE;
      const respondentIsPrivate = data?.applicant2AddressPrivate === YesOrNo.YES;

      if (wantsToSendPapersAgain) {
        return respondentIsPrivate ? WILL_SERVE_AGAIN : NEW_CONTACT_DETAIL_CHECK_ANSWERS;
      } else {
        return NO_NEW_ADDRESS;
      }
    },
  },
  {
    url: WILL_SERVE_AGAIN,
    getNextStep: (): PageLink => {
      return HUB_PAGE;
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
      return data.applicant1NoResponseProcessServerOrBailiff === NoResponseProcessServerOrBailiff.PROCESS_SERVER
        ? PROCESS_SERVER
        : BAILIFF_SERVICE_APPLICATION;
    },
  },
  {
    url: PROCESS_SERVER,
    getNextStep: () => SUCCESS_SCREEN_PROCESS_SERVER,
  },
  {
    url: SUCCESS_SCREEN_PROCESS_SERVER,
    getNextStep: () => PROCESS_SERVER_DOCS,
  },
  {
    url: PROCESS_SERVER_DOCS,
    getNextStep: (): PageLink => HUB_PAGE,
  },
  {
    url: OWN_SEARCHES,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      return data.applicant1NoResponseOwnSearches === NoResponseOwnSearches.NO ? SEARCH_TIPS : IS_PARTNER_ABROAD;
    },
  },
  {
    url: IS_PARTNER_ABROAD,
    getNextStep: (data: Partial<CaseWithId>): PageLink =>
      data.applicant1NoResponsePartnerInUkOrReceivingBenefits === YesOrNo.NO
        ? DISPENSE_SERVICE_APPLICATION
        : GOV_SEARCH_POSSIBLE,
  },
  {
    url: GOV_SEARCH_POSSIBLE,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      if (data.applicant1NoResponseSearchOrDispense === NoResponseSearchOrDispense.SEARCH) {
        return SEARCH_GOV_RECORDS_APPLICATION;
      }
      return DISPENSE_SERVICE_APPLICATION;
    },
  },
  {
    url: SEARCH_TIPS,
    getNextStep: (): PageLink => HUB_PAGE,
  },
];
