import { CaseWithId } from '../app/case/case';
import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  CHECK_YOUR_ANSWERS_GOV_RECORDS,
  GENERAL_APPLICATION_SUBMITTED,
  HELP_PAYING_NEED_TO_APPLY_SEARCH_GOV_RECORDS,
  HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS,
  HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS,
  PARTNER_ADDRESS_ADDITIONAL_ADDRESSES,
  PARTNER_ADDRESS_ADDITIONAL_GOV_RECORDS,
  PARTNER_ADDRESS_GOV_RECORDS,
  PARTNER_DOB_GOV_RECORDS,
  PARTNER_NAME_GOV_RECORDS,
  PARTNER_NI_GOV_RECORDS,
  PAY_YOUR_GENERAL_APPLICATION_FEE,
  PageLink,
  SEARCH_GOV_RECORDS_APPLICATION,
  SEARCH_GOV_RECORDS_HWF,
  WHICH_GOV_DEPARTMENTS,
  WHY_SEARCH_GOV_RECORDS,
} from './urls';

export const searchGovRecordsApplicationSequence: Step[] = [
  {
    url: SEARCH_GOV_RECORDS_APPLICATION,
    getNextStep: () => SEARCH_GOV_RECORDS_HWF,
  },
  {
    url: SEARCH_GOV_RECORDS_HWF,
    getNextStep: (data: Partial<CaseWithId>): PageLink =>
      data.applicant1InterimAppsUseHelpWithFees === YesOrNo.YES
        ? HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS
        : WHY_SEARCH_GOV_RECORDS,
  },
  {
    url: HWF_REFERENCE_NUMBER_SEARCH_GOV_RECORDS,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      return data.applicant1InterimAppsHaveHwfReference === YesOrNo.YES
        ? HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS
        : HELP_PAYING_NEED_TO_APPLY_SEARCH_GOV_RECORDS;
    },
  },
  {
    url: HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS,
    getNextStep: (): PageLink => WHY_SEARCH_GOV_RECORDS,
  },
  {
    url: HELP_PAYING_NEED_TO_APPLY_SEARCH_GOV_RECORDS,
    getNextStep: (): PageLink => HWF_REFERENCE_NUMBER_INPUT_GOV_RECORDS,
  },
  {
    url: WHY_SEARCH_GOV_RECORDS,
    getNextStep: (): PageLink => WHICH_GOV_DEPARTMENTS,
  },
  {
    url: WHICH_GOV_DEPARTMENTS,
    getNextStep: (): PageLink => PARTNER_NAME_GOV_RECORDS,
  },
  {
    url: PARTNER_NAME_GOV_RECORDS,
    getNextStep: (): PageLink => PARTNER_DOB_GOV_RECORDS,
  },
  {
    url: PARTNER_DOB_GOV_RECORDS,
    getNextStep: (): PageLink => PARTNER_NI_GOV_RECORDS,
  },
  {
    url: PARTNER_NI_GOV_RECORDS,
    getNextStep: (): PageLink => PARTNER_ADDRESS_GOV_RECORDS,
  },
  {
    url: PARTNER_ADDRESS_GOV_RECORDS,
    getNextStep: (): PageLink => PARTNER_ADDRESS_ADDITIONAL_ADDRESSES,
  },
  {
    url: PARTNER_ADDRESS_ADDITIONAL_ADDRESSES,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      return data.applicant1SearchGovRecordsKnowPartnerAdditionalAddresses === YesOrNo.YES
        ? PARTNER_ADDRESS_ADDITIONAL_GOV_RECORDS
        : CHECK_YOUR_ANSWERS_GOV_RECORDS;
    },
  },
  {
    url: PARTNER_ADDRESS_ADDITIONAL_GOV_RECORDS,
    getNextStep: (): PageLink => CHECK_YOUR_ANSWERS_GOV_RECORDS,
  },
  {
    url: CHECK_YOUR_ANSWERS_GOV_RECORDS,
    getNextStep: (data: Partial<CaseWithId>): PageLink =>
      data?.applicant1GeneralApplicationServiceRequest
        ? PAY_YOUR_GENERAL_APPLICATION_FEE
        : GENERAL_APPLICATION_SUBMITTED,
  },
];
