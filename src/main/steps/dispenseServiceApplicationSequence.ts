import dayjs from 'dayjs';

import { getFormattedCaseDate } from '../app/case/answers/formatDate';
import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  APPLY_FOR_HWF_DISPENSE,
  AWARE_PARTNER_ADDRESS_DISPENSE,
  CHILDREN_CONTACT_DISPENSE,
  CHILDREN_OF_FAMILY_DISPENSE,
  CHILD_MAINTENANCE_DISPENSE,
  DA_SEARCH_DISPENSE,
  DISPENSE_SERVICE_APPLICATION,
  EMAIL_DESCRIPTION_DISPENSE,
  EMAIL_DISPENSE,
  EMPLOYMENT_CONTACT_DISPENSE,
  EMPLOYMENT_DETAILS_DISPENSE,
  FRIENDS_OR_RELATIVES_DISPENSE,
  HELP_WITH_FEES_DISPENSE,
  HUB_PAGE,
  HWF_REFERENCE_NUMBER_DISPENSE,
  HWF_REFERENCE_NUMBER_INPUT_DISPENSE,
  LAST_ADDRESS_DISPENSE,
  LAST_CONTACT_CHILDREN_DISPENSE,
  LAST_DATE_DISPENSE,
  LAST_SEEN_DISPENSE,
  PARTNER_NEW_ADDRESS_DISPENSE,
  PHONE_DESCRIPTION_DISPENSE,
  PHONE_NUMBER_DISPENSE,
  SEARCHING_ONLINE_DISPENSE,
  SEARCHING_ONLINE_RESULTS_DISPENSE,
  TRACING_AGENT_DISPENSE,
  TRACING_AGENT_RESULTS_DISPENSE,
  TRACING_ONLINE_DISPENSE,
  TRACING_ONLINE_RESULTS_DISPENSE,
  WHEN_CONTACT_CHILDREN_DISPENSE,
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
        : TRACING_AGENT_DISPENSE,
  },
  {
    url: PHONE_DESCRIPTION_DISPENSE,
    getNextStep: () => TRACING_AGENT_DISPENSE,
  },
  {
    url: TRACING_AGENT_DISPENSE,
    getNextStep: data =>
      data?.applicant1DispenseTriedTracingAgent === YesOrNo.YES
        ? TRACING_AGENT_RESULTS_DISPENSE
        : TRACING_ONLINE_DISPENSE,
  },
  {
    url: TRACING_AGENT_RESULTS_DISPENSE,
    getNextStep: () => TRACING_ONLINE_DISPENSE,
  },
  {
    url: TRACING_ONLINE_DISPENSE,
    getNextStep: data =>
      data?.applicant1DispenseTriedTracingOnline === YesOrNo.YES
        ? TRACING_ONLINE_RESULTS_DISPENSE
        : SEARCHING_ONLINE_DISPENSE,
  },
  {
    url: TRACING_ONLINE_RESULTS_DISPENSE,
    getNextStep: () => SEARCHING_ONLINE_DISPENSE,
  },
  {
    url: SEARCHING_ONLINE_DISPENSE,
    getNextStep: data =>
      data?.applicant1DispenseTriedSearchingOnline === YesOrNo.YES
        ? SEARCHING_ONLINE_RESULTS_DISPENSE
        : EMPLOYMENT_CONTACT_DISPENSE,
  },
  {
    url: SEARCHING_ONLINE_RESULTS_DISPENSE,
    getNextStep: () => EMPLOYMENT_CONTACT_DISPENSE,
  },
  {
    url: EMPLOYMENT_CONTACT_DISPENSE,
    getNextStep: data =>
      data?.applicant1DispenseTriedContactingEmployer === YesOrNo.YES
        ? EMPLOYMENT_DETAILS_DISPENSE
        : CHILDREN_OF_FAMILY_DISPENSE,
  },
  {
    url: EMPLOYMENT_DETAILS_DISPENSE,
    getNextStep: () => CHILDREN_OF_FAMILY_DISPENSE,
  },
  {
    url: CHILDREN_OF_FAMILY_DISPENSE,
    getNextStep: data =>
      data?.applicant1DispenseChildrenOfFamily === YesOrNo.YES
        ? CHILDREN_CONTACT_DISPENSE
        : FRIENDS_OR_RELATIVES_DISPENSE,
  },
  {
    url: CHILDREN_CONTACT_DISPENSE,
    getNextStep: data =>
      data?.applicant1DispensePartnerContactWithChildren === YesOrNo.YES
        ? WHEN_CONTACT_CHILDREN_DISPENSE
        : LAST_CONTACT_CHILDREN_DISPENSE,
  },
  {
    url: WHEN_CONTACT_CHILDREN_DISPENSE,
    getNextStep: () => CHILD_MAINTENANCE_DISPENSE,
  },
  {
    url: LAST_CONTACT_CHILDREN_DISPENSE,
    getNextStep: () => CHILD_MAINTENANCE_DISPENSE,
  },
  {
    url: CHILD_MAINTENANCE_DISPENSE,
    getNextStep: () => FRIENDS_OR_RELATIVES_DISPENSE,
  },
  {
    url: FRIENDS_OR_RELATIVES_DISPENSE,
    getNextStep: data => (data?.applicant1DispenseTriedContactingEmployer === YesOrNo.YES ? HUB_PAGE : HUB_PAGE),
  },
];
