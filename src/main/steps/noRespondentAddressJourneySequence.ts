import { CaseWithId } from '../app/case/case';
import { NoResponseSearchOrDispense, YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
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
  PageLink,
  SEARCH_GOV_RECORDS_APPLICATION,
} from './urls';

export const noRespondentAddressJourneySequence: Step[] = [
  {
    url: NO_RESP_ADDRESS_PROGRESS_WITHOUT_ADDRESS,
    getNextStep: (): PageLink => NO_RESP_ADDRESS_HAVE_FOUND_ADDRESS,
  },
  {
    url: NO_RESP_ADDRESS_HAVE_FOUND_ADDRESS,
    getNextStep: (data: Partial<CaseWithId>): PageLink =>
      data.applicant1NoRespAddressHasFoundAddress === YesOrNo.YES
        ? NO_RESP_ADDRESS_ENTER_ADDRESS
        : NO_RESP_ADDRESS_HAVE_DIFFERENT_WAY_TO_CONTACT,
  },
  {
    url: NO_RESP_ADDRESS_ENTER_ADDRESS,
    getNextStep: (): PageLink => NO_RESP_ADDRESS_ENTER_ADDRESS,
  },
  {
    url: NO_RESP_ADDRESS_HAVE_DIFFERENT_WAY_TO_CONTACT,
    getNextStep: (data: Partial<CaseWithId>): PageLink =>
      data.applicant1NoRespAddressHasWayToContact === YesOrNo.YES
        ? NO_RESP_ADDRESS_WILL_APPLY_TO_SEND_PAPERS
        : NO_RESP_ADDRESS_SEARCHING_FOR_DETAILS,
  },
  {
    url: NO_RESP_ADDRESS_WILL_APPLY_TO_SEND_PAPERS,
    getNextStep: (data: Partial<CaseWithId>): PageLink =>
      data.applicant1NoRespAddressWillApplyAltService === YesOrNo.YES
        ? ALTERNATIVE_SERVICE_APPLICATION
        : NO_RESP_ADDRESS_SEARCHING_FOR_DETAILS,
  },
  {
    url: NO_RESP_ADDRESS_SEARCHING_FOR_DETAILS,
    getNextStep: (): PageLink => NO_RESP_ADDRESS_IS_PARTNER_ABROAD,
  },
  {
    url: NO_RESP_ADDRESS_IS_PARTNER_ABROAD,
    getNextStep: (data: Partial<CaseWithId>): PageLink =>
      data.applicant1NoResponsePartnerInUkOrReceivingBenefits === YesOrNo.NO
        ? DISPENSE_SERVICE_APPLICATION
        : NO_RESP_ADDRESS_GOV_SEARCH_POSSIBLE,
  },
  {
    url: NO_RESP_ADDRESS_GOV_SEARCH_POSSIBLE,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      if (data.applicant1NoResponseSearchOrDispense === NoResponseSearchOrDispense.SEARCH) {
        return SEARCH_GOV_RECORDS_APPLICATION;
      }
      return DISPENSE_SERVICE_APPLICATION;
    },
  },
];
