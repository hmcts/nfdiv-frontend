import dayjs from 'dayjs';

import { getFormattedCaseDate } from '../app/case/answers/formatDate';
import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  APPLY_FOR_HWF_DISPENSE,
  AWARE_PARTNER_ADDRESS_DISPENSE,
  DA_SEARCH_DISPENSE,
  DA_UPLOAD,
  DISPENSE_SERVICE_APPLICATION,
  EMAIL_DESCRIPTION_DISPENSE,
  EMAIL_DISPENSE,
  ENQUIRY_AGENT_DISPENSE,
  HELP_WITH_FEES_DISPENSE,
  HUB_PAGE,
  HWF_REFERENCE_NUMBER_DISPENSE,
  HWF_REFERENCE_NUMBER_INPUT_DISPENSE,
  LAST_ADDRESS_DISPENSE,
  LAST_DATE_DISPENSE,
  LAST_SEEN_DISPENSE,
  PARTNER_NEW_ADDRESS_DISPENSE,
  PHONE_DESCRIPTION_DISPENSE,
  PHONE_NUMBER_DISPENSE,
} from './urls';

export const dispenseServiceApplicationSequence: Step[] = [
  {
    url: DISPENSE_SERVICE_APPLICATION,
    getNextStep: () => HELP_WITH_FEES_DISPENSE,
  },
  {
    url: HELP_WITH_FEES_DISPENSE,
    getNextStep: data =>
      data?.applicant1InterimAppsUseHelpWithFees === YesOrNo.YES ? HWF_REFERENCE_NUMBER_DISPENSE : LAST_DATE_DISPENSE,
  },
  {
    url: HWF_REFERENCE_NUMBER_DISPENSE,
    getNextStep: data =>
      data?.applicant1InterimAppsHaveHwfReference === YesOrNo.YES
        ? HWF_REFERENCE_NUMBER_INPUT_DISPENSE
        : APPLY_FOR_HWF_DISPENSE,
  },
  {
    url: HWF_REFERENCE_NUMBER_INPUT_DISPENSE,
    getNextStep: () => LAST_DATE_DISPENSE,
  },
  {
    url: APPLY_FOR_HWF_DISPENSE,
    getNextStep: () => HWF_REFERENCE_NUMBER_INPUT_DISPENSE,
  },
  {
    url: LAST_DATE_DISPENSE,
    getNextStep: data =>
      data?.applicant1DispenseLiveTogether === YesOrNo.YES ? LAST_ADDRESS_DISPENSE : AWARE_PARTNER_ADDRESS_DISPENSE,
  },
  {
    url: LAST_ADDRESS_DISPENSE,
    getNextStep: () => AWARE_PARTNER_ADDRESS_DISPENSE,
  },
  {
    url: AWARE_PARTNER_ADDRESS_DISPENSE,
    getNextStep: data =>
      data?.applicant1DispenseAwarePartnerLived === YesOrNo.YES ? PARTNER_NEW_ADDRESS_DISPENSE : LAST_SEEN_DISPENSE,
  },
  {
    url: PARTNER_NEW_ADDRESS_DISPENSE,
    getNextStep: () => LAST_SEEN_DISPENSE,
  },
  {
    url: LAST_SEEN_DISPENSE,
    getNextStep: data =>
      dayjs(Date.now())
        .subtract(2, 'year')
        .isBefore(getFormattedCaseDate(data?.applicant1DispensePartnerLastSeenOrHeardOfDate) as string)
        ? EMAIL_DISPENSE
        : DA_SEARCH_DISPENSE,
  },
  {
    url: EMAIL_DISPENSE,
    getNextStep: data =>
      data?.applicant1DispenseHavePartnerEmailAddresses === YesOrNo.YES
        ? EMAIL_DESCRIPTION_DISPENSE
        : PHONE_NUMBER_DISPENSE,
  },
  {
    url: DA_SEARCH_DISPENSE,
    getNextStep: data => (data?.applicant1DispenseHaveSearchedFinalOrder === YesOrNo.YES ? DA_UPLOAD : EMAIL_DISPENSE),
  },
  {
    url: DA_UPLOAD,
    getNextStep: () => EMAIL_DISPENSE,
  },
  {
    url: EMAIL_DESCRIPTION_DISPENSE,
    getNextStep: () => PHONE_NUMBER_DISPENSE,
  },
  {
    url: PHONE_NUMBER_DISPENSE,
    getNextStep: data =>
      data?.applicant1DispenseHavePartnerPhoneNumbers === YesOrNo.YES
        ? PHONE_DESCRIPTION_DISPENSE
        : ENQUIRY_AGENT_DISPENSE,
  },
  {
    url: PHONE_DESCRIPTION_DISPENSE,
    getNextStep: () => ENQUIRY_AGENT_DISPENSE,
  },
  {
    url: ENQUIRY_AGENT_DISPENSE,
    getNextStep: () => HUB_PAGE,
  },
];
