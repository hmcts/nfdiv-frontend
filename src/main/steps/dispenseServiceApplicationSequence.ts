import { Case } from '../app/case/case';
import { DispenseWithServiceJourneyLogicalTests, ServicePaymentMethod, YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  APPLY_FOR_HWF_DISPENSE,
  AWARE_PARTNER_ADDRESS_DISPENSE,
  CHECK_ANSWERS_DISPENSE,
  CHILDREN_CONTACT_DISPENSE,
  CHILDREN_OF_FAMILY_DISPENSE,
  CHILD_MAINTENANCE_DISPENSE,
  DISPENSE_SERVICE_APPLICATION,
  EMAIL_DESCRIPTION_DISPENSE,
  EMAIL_DISPENSE,
  EMPLOYMENT_CONTACT_DISPENSE,
  EMPLOYMENT_DETAILS_DISPENSE,
  FINAL_ORDER_SEARCH_DISPENSE,
  FRIENDS_OR_RELATIVES_DISPENSE,
  HELP_WITH_FEES_DISPENSE,
  HWF_REFERENCE_NUMBER_DISPENSE,
  HWF_REFERENCE_NUMBER_INPUT_DISPENSE,
  LAST_ADDRESS_DISPENSE,
  LAST_CONTACT_CHILDREN_DISPENSE,
  LAST_DATE_DISPENSE,
  LAST_SEEN_DISPENSE,
  OTHER_ENQUIRIES_DISPENSE,
  PARTNER_NEW_ADDRESS_DISPENSE,
  PAY_YOUR_SERVICE_FEE,
  PHONE_DESCRIPTION_DISPENSE,
  PHONE_NUMBER_DISPENSE,
  SEARCHING_ONLINE_DISPENSE,
  SEARCHING_ONLINE_RESULTS_DISPENSE,
  SERVICE_APPLICATION_SUBMITTED,
  TRACING_AGENT_DISPENSE,
  TRACING_AGENT_RESULTS_DISPENSE,
  TRACING_ONLINE_DISPENSE,
  TRACING_ONLINE_RESULTS_DISPENSE,
  UPLOAD_EVIDENCE_DISPENSE,
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
      data?.applicant1DispensePartnerLastSeenOver2YearsAgo === YesOrNo.NO
        ? EMAIL_DISPENSE
        : FINAL_ORDER_SEARCH_DISPENSE,
  },
  {
    url: EMAIL_DISPENSE,
    getNextStep: data =>
      data?.applicant1DispenseHavePartnerEmailAddresses === YesOrNo.YES
        ? EMAIL_DESCRIPTION_DISPENSE
        : PHONE_NUMBER_DISPENSE,
  },
  {
    url: FINAL_ORDER_SEARCH_DISPENSE,
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
    getNextStep: () => OTHER_ENQUIRIES_DISPENSE,
  },
  {
    url: OTHER_ENQUIRIES_DISPENSE,
    getNextStep: data =>
      getDispenseLogicalTests(data).showUploadEvidence ? UPLOAD_EVIDENCE_DISPENSE : CHECK_ANSWERS_DISPENSE,
  },
  {
    url: UPLOAD_EVIDENCE_DISPENSE,
    getNextStep: () => CHECK_ANSWERS_DISPENSE,
  },
  {
    url: CHECK_ANSWERS_DISPENSE,
    getNextStep: data =>
      data?.servicePaymentFeePaymentMethod === ServicePaymentMethod.FEE_PAY_BY_CARD
        ? PAY_YOUR_SERVICE_FEE
        : SERVICE_APPLICATION_SUBMITTED,
  },
];

export const getDispenseLogicalTests = (caseData: Partial<Case>): DispenseWithServiceJourneyLogicalTests => {
  const results: DispenseWithServiceJourneyLogicalTests = {
    searchedForFinalOrder: caseData.applicant1DispenseHaveSearchedFinalOrder === YesOrNo.YES,
    haveEmail: caseData.applicant1DispenseHavePartnerEmailAddresses === YesOrNo.YES,
    havePhone: caseData.applicant1DispenseHavePartnerPhoneNumbers === YesOrNo.YES,
    usedTracingAgent: caseData.applicant1DispenseTriedTracingAgent === YesOrNo.YES,
    tracedOnline: caseData.applicant1DispenseTriedTracingOnline === YesOrNo.YES,
    usedOnlineSearch: caseData.applicant1DispenseTriedSearchingOnline === YesOrNo.YES,
    contactedEmployer: caseData.applicant1DispenseTriedContactingEmployer === YesOrNo.YES,
    madeOtherEnquiries: caseData.applicant1DispenseOtherEnquiries?.trim().toLowerCase() !== 'none',
    showUploadEvidence: false,
  };
  results.showUploadEvidence =
    results.searchedForFinalOrder ||
    results.haveEmail ||
    results.havePhone ||
    results.usedTracingAgent ||
    results.tracedOnline ||
    results.usedOnlineSearch ||
    results.contactedEmployer ||
    results.madeOtherEnquiries;

  return results;
};
