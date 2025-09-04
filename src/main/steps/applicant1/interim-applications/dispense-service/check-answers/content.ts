import striptags from 'striptags';

import { getFormattedCaseDate } from '../../../../../app/case/answers/formatDate';
import { Checkbox } from '../../../../../app/case/case';
import { YesOrNo } from '../../../../../app/case/definition';
import { getFilename } from '../../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import * as urls from '../../../../urls';
import {
  form as checkAnswersForm,
  generateContent as checkAnswersGenerateContent,
} from '../../common/check-answers/content';
import { getDispenseLogicalTests } from '../upload-evidence/content';

const stepLinks = {
  useHwf: `${urls.HELP_WITH_FEES_DISPENSE}`,
  hwfReference: `${urls.HWF_REFERENCE_NUMBER_INPUT_DISPENSE}`,
  didYouLiveTogether: `${urls.LAST_DATE_DISPENSE}`,
  dateLastLivedTogether: `${urls.LAST_DATE_DISPENSE}`,
  whereLivedTogether: `${urls.LAST_ADDRESS_DISPENSE}`,
  wherePartnerLivedAfterParting: `${urls.AWARE_PARTNER_ADDRESS_DISPENSE}`,
  partnerAddress1: `${urls.PARTNER_NEW_ADDRESS_DISPENSE}`,
  partnerAddress2: `${urls.PARTNER_NEW_ADDRESS_DISPENSE}`,
  whenPartnerLastSeen: `${urls.LAST_SEEN_DISPENSE}`,
  partnerLastSeenDescription: `${urls.LAST_SEEN_DISPENSE}`,
  finalOrderSearch: `${urls.FINAL_ORDER_SEARCH_DISPENSE}`,
  whyNofinalOrderSearch: `${urls.FINAL_ORDER_SEARCH_DISPENSE}`,
  partnerEmail: `${urls.EMAIL_DISPENSE}`,
  emailDetails: `${urls.EMAIL_DESCRIPTION_DISPENSE}`,
  partnerPhone: `${urls.PHONE_NUMBER_DISPENSE}`,
  phoneDetails: `${urls.PHONE_NUMBER_DISPENSE}`,
  tracingAgent: `${urls.TRACING_AGENT_DISPENSE}`,
  tracingAgentDetails: `${urls.TRACING_AGENT_RESULTS_DISPENSE}`,
  whyNoTracingAgent: `${urls.TRACING_AGENT_DISPENSE}`,
  tracingOnline: `${urls.TRACING_ONLINE_DISPENSE}`,
  tracingOnlineDetails: `${urls.TRACING_ONLINE_RESULTS_DISPENSE}`,
  whyNoTracingOnline: `${urls.TRACING_ONLINE_DISPENSE}`,
  onlineSearch: `${urls.SEARCHING_ONLINE_DISPENSE}`,
  onlineSearchDetails: `${urls.SEARCHING_ONLINE_RESULTS_DISPENSE}`,
  whyNoOnlineSearch: `${urls.SEARCHING_ONLINE_DISPENSE}`,
  employer: `${urls.EMPLOYMENT_CONTACT_DISPENSE}`,
  employerName: `${urls.EMPLOYMENT_DETAILS_DISPENSE}`,
  employerAddress: `${urls.EMPLOYMENT_DETAILS_DISPENSE}`,
  partnerOccupation: `${urls.EMPLOYMENT_DETAILS_DISPENSE}`,
  employerResultsDescription: `${urls.EMPLOYMENT_DETAILS_DISPENSE}`,
  whyNoEmployer: `${urls.EMPLOYMENT_CONTACT_DISPENSE}`,
  childrenOfTheFamily: `${urls.CHILDREN_OF_FAMILY_DISPENSE}`,
  partnerContact: `${urls.CHILDREN_CONTACT_DISPENSE}`,
  whenPartnerContact: `${urls.WHEN_CONTACT_CHILDREN_DISPENSE}`,
  partnerLastContactDetails: `${urls.LAST_CONTACT_CHILDREN_DISPENSE}`,
  childMaintenance: `${urls.CHILD_MAINTENANCE_DISPENSE}`,
  childMaintenanceDetails: `${urls.CHILD_MAINTENANCE_DISPENSE}`,
  friendsOrRelatives: `${urls.FRIENDS_OR_RELATIVES_DISPENSE}`,
  otherEnquiries: `${urls.OTHER_ENQUIRIES_DISPENSE}`,
  uploadedFiles: `${urls.UPLOAD_EVIDENCE_DISPENSE}`,
};

const en = (stepAnswers, { partner }: CommonContent) => ({
  stepQuestions: {
    useHwf: 'Help paying the application fee',
    hwfReference: 'Help with fees reference number',
    didYouLiveTogether: `Did you and your ${partner} live together?`,
    dateLastLivedTogether: 'The date you last lived together',
    whereLivedTogether: `Where did you and your ${partner} live together?`,
    wherePartnerLivedAfterParting: `Are you aware of where your ${partner} lived after parting?`,
    partnerAddress1: `${partner}'s address 1`,
    partnerAddress2: `${partner}'s address 2`,
    whenPartnerLastSeen: `When was your ${partner} last seen or heard of?`,
    partnerLastSeenDescription: `Describe the last time you saw or heard of your ${partner}`,
    finalOrderSearch: 'Have you searched for an existing decree absolute or final order?',
    whyNofinalOrderSearch: 'Explain why you have not requested a search',
    partnerEmail: `Do you have any email addresses for your ${partner}?`,
    emailDetails: "Tell us the email addresses and any previous contact you've had.",
    partnerPhone: `Do you have any phone numbers for your ${partner}?`,
    phoneDetails: "Tell us the phone numbers and any previous contact you've had.",
    tracingAgent: `Have you tried using a tracing agent to find your ${partner}?`,
    tracingAgentDetails: "What were the results of your tracing agent's search?",
    whyNoTracingAgent: 'Explain why you have not used a tracing agent',
    tracingOnline: `Have you tried tracing your ${partner} online?`,
    tracingOnlineDetails: 'What were the results of your online searches?',
    whyNoTracingOnline: `Explain why you have not tried tracing your ${partner} online`,
    onlineSearch: `Have you tried finding your ${partner}'s details online by searching the internet?`,
    onlineSearchDetails: 'What were the results of your online searches?',
    whyNoOnlineSearch: `Explain why you have not tried searching for your ${partner} online`,
    employer: `Have you tried contacting your ${partner}'s last known employer?`,
    employerName: 'Name of employer',
    employerAddress: 'Employer address',
    partnerOccupation: `Your ${partner}'s occupation`,
    employerResultsDescription: 'Results of your enquiry with the employer',
    whyNoEmployer: 'Explain why you have not tried contacting the last known employer',
    childrenOfTheFamily: 'Are there any children of the family?',
    partnerContact: `Does your ${partner} have any contact with them?`,
    whenPartnerContact: `When and how does your ${partner} have contact with them?`,
    partnerLastContactDetails: `When did your ${partner} last have contact with them?`,
    childMaintenance:
      'Is there a court order or a Child Maintenance Service calculation in place for child maintenance?',
    childMaintenanceDetails: `Explain the results of any enquiries made to the court or Child Maintenance Service about your ${partner}'s whereabouts`,
    friendsOrRelatives: `Have you been able to contact any of your ${partner}'s friends or relatives?`,
    otherEnquiries: `What other enquiries have you made or information do you have concerning the whereabouts of your ${partner}?`,
    uploadedFiles: 'Uploaded files',
  },
  stepAnswers,
  stepLinks,
});

const cy: typeof en = (stepAnswers, { partner }: CommonContent) => ({
  stepQuestions: {
    useHwf: 'Help paying the application fee',
    hwfReference: 'Help with fees reference number',
    didYouLiveTogether: `Did you and your ${partner} live together?`,
    dateLastLivedTogether: 'The date you last lived together',
    whereLivedTogether: `Where did you and your ${partner} live together?`,
    wherePartnerLivedAfterParting: `Are you aware of where your ${partner} lived after parting?`,
    partnerAddress1: `${partner}'s address 1`,
    partnerAddress2: `${partner}'s address 2`,
    whenPartnerLastSeen: `When was your ${partner} last seen or heard of?`,
    partnerLastSeenDescription: `Describe the last time you saw or heard of your ${partner}`,
    finalOrderSearch: 'Have you searched for an existing decree absolute or final order?',
    whyNofinalOrderSearch: 'Explain why you have not requested a search',
    partnerEmail: `Do you have any email addresses for your ${partner}?`,
    emailDetails: "Tell us the email addresses and any previous contact you've had.",
    partnerPhone: `Do you have any phone numbers for your ${partner}?`,
    phoneDetails: "Tell us the phone numbers and any previous contact you've had.",
    tracingAgent: `Have you tried using a tracing agent to find your ${partner}?`,
    tracingAgentDetails: "What were the results of your tracing agent's search?",
    whyNoTracingAgent: 'Explain why you have not used a tracing agent',
    tracingOnline: `Have you tried tracing your ${partner} online?`,
    tracingOnlineDetails: 'What were the results of your online searches?',
    whyNoTracingOnline: `Explain why you have not tried tracing your ${partner} online`,
    onlineSearch: `Have you tried finding your ${partner}'s details online by searching the internet?`,
    onlineSearchDetails: 'What were the results of your online searches?',
    whyNoOnlineSearch: `Explain why you have not tried searching for your ${partner} online`,
    employer: `Have you tried contacting your ${partner}'s last known employer?`,
    employerName: 'Name of employer',
    employerAddress: 'Employer address',
    partnerOccupation: `Your ${partner}'s occupation`,
    employerResultsDescription: 'Results of your enquiry with the employer',
    whyNoEmployer: 'Explain why you have not tried contacting the last known employer',
    childrenOfTheFamily: 'Are there any children of the family?',
    partnerContact: `Does your ${partner} have any contact with them?`,
    whenPartnerContact: `When and how does your ${partner} have contact with them?`,
    partnerLastContactDetails: `When did your ${partner} last have contact with them?`,
    childMaintenance:
      'Is there a court order or a Child Maintenance Service calculation in place for child maintenance?',
    childMaintenanceDetails: `Explain the results of any enquiries made to the court or Child Maintenance Service about your ${partner}'s whereabouts`,
    friendsOrRelatives: `Have you been able to contact any of your ${partner}'s friends or relatives?`,
    otherEnquiries: `What other enquiries have you made or information do you have concerning the whereabouts of your ${partner}?`,
    uploadedFiles: 'Uploaded files',
  },
  stepAnswers,
  stepLinks,
});

export const form: FormContent = checkAnswersForm;

const languages = {
  en,
  cy,
};

const formatAddress = (...addressLines: (string | undefined)[]) => {
  return addressLines
    .map(line => (line ? striptags(line) : undefined))
    .filter(Boolean)
    .join('<br>');
};

export const generateContent: TranslationFn = content => {
  const checkAnswersContent = checkAnswersGenerateContent(content);
  const useHwf = content.userCase.applicant1InterimAppsUseHelpWithFees;
  const hwfReference = content.userCase.applicant1InterimAppsHwfRefNumber;
  const uploadedDocsFilenames = content.userCase.applicant1InterimAppsEvidenceDocs?.map(item =>
    getFilename(item.value)
  );
  const cannotUploadDocs =
    content.userCase.applicant1InterimAppsCannotUploadDocs === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;

  const dispenseLogic = getDispenseLogicalTests(content.userCase);
  const citizenShownUploadPage =
    dispenseLogic.finalOrderSearch ||
    dispenseLogic.haveEmail ||
    dispenseLogic.havePhone ||
    dispenseLogic.usedTracingAgent ||
    dispenseLogic.tracedOnline ||
    dispenseLogic.usedOnlineSearch ||
    dispenseLogic.contactedEmployer ||
    dispenseLogic.otherEnquiries;

  const stepAnswers = {
    useHwf,
    hwfReference,
    didYouLiveTogether: content.userCase.applicant1DispenseLiveTogether,
    dateLastLivedTogether: getFormattedCaseDate(content.userCase.applicant1DispenseLastLivedTogetherDate) || undefined,
    whereLivedTogether: formatAddress(
      content.userCase.applicant1DispenseLivedTogetherAddress1,
      content.userCase.applicant1DispenseLivedTogetherAddress2,
      content.userCase.applicant1DispenseLivedTogetherAddress3,
      content.userCase.applicant1DispenseLivedTogetherAddressTown,
      content.userCase.applicant1DispenseLivedTogetherAddressCounty,
      content.userCase.applicant1DispenseLivedTogetherAddressPostcode,
      content.userCase.applicant1DispenseLivedTogetherAddressCountry
    ),
    wherePartnerLivedAfterParting: content.userCase.applicant1DispenseAwarePartnerLived,
    partnerAddress1: [
      content.userCase.applicant1DispensePartnerPastAddress1,
      content.userCase.applicant1DispensePartnerPastAddressEnquiries1,
    ]
      .filter(Boolean)
      .join('<br>'),
    partnerAddress2: [
      content.userCase.applicant1DispensePartnerPastAddress2,
      content.userCase.applicant1DispensePartnerPastAddressEnquiries2,
    ]
      .filter(Boolean)
      .join('<br>'),
    whenPartnerLastSeen: getFormattedCaseDate(content.userCase.applicant1DispensePartnerLastSeenOrHeardOfDate),
    partnerLastSeenDescription: content.userCase.applicant1DispensePartnerLastSeenDescription,
    finalOrderSearch: content.userCase.applicant1DispenseHaveSearchedFinalOrder,
    whyNofinalOrderSearch: content.userCase.applicant1DispenseWhyNoFinalOrderSearch,
    partnerEmail: content.userCase.applicant1DispenseHavePartnerEmailAddresses,
    emailDetails: content.userCase.applicant1DispensePartnerEmailAddresses,
    partnerPhone: content.userCase.applicant1DispenseHavePartnerPhoneNumbers,
    phoneDetails: content.userCase.applicant1DispensePartnerPhoneNumbers,
    tracingAgent: content.userCase.applicant1DispenseTriedTracingAgent,
    tracingAgentDetails: content.userCase.applicant1DispenseTracingAgentResults,
    whyNoTracingAgent: content.userCase.applicant1DispenseWhyNoTracingAgent,
    tracingOnline: content.userCase.applicant1DispenseTriedTracingOnline,
    tracingOnlineDetails: content.userCase.applicant1DispenseTracingOnlineResults,
    whyNoTracingOnline: content.userCase.applicant1DispenseWhyNoTracingOnline,
    onlineSearch: content.userCase.applicant1DispenseTriedSearchingOnline,
    onlineSearchDetails: content.userCase.applicant1DispenseSearchingOnlineResults,
    whyNoOnlineSearch: content.userCase.applicant1DispenseWhyNoSearchingOnline,
    employer: content.userCase.applicant1DispenseTriedContactingEmployer,
    employerName: content.userCase.applicant1DispenseEmployerName,
    employerAddress: content.userCase.applicant1DispenseEmployerAddress,
    partnerOccupation: content.userCase.applicant1DispensePartnerOccupation,
    employerResultsDescription: content.userCase.applicant1DispenseContactingEmployerResults,
    whyNoEmployer: content.userCase.applicant1DispenseWhyNoContactingEmployer,
    childrenOfTheFamily: content.userCase.applicant1DispenseChildrenOfFamily,
    partnerContact: content.userCase.applicant1DispensePartnerContactWithChildren,
    whenPartnerContact: content.userCase.applicant1DispenseHowPartnerContactChildren,
    partnerLastContactDetails: content.userCase.applicant1DispensePartnerLastContactChildren,
    childMaintenance: content.userCase.applicant1DispenseChildMaintenanceOrder,
    childMaintenanceDetails: content.userCase.applicant1DispenseChildMaintenanceResults,
    friendsOrRelatives: content.userCase.applicant1DispenseContactFriendsOrRelativesDetails,
    otherEnquiries: content.userCase.applicant1DispenseOtherEnquiries,
    cannotUploadDocs: citizenShownUploadPage ? cannotUploadDocs : undefined,
    uploadedDocsFilenames: citizenShownUploadPage ? uploadedDocsFilenames : undefined,
  };

  const translations = languages[content.language](stepAnswers, content);
  return {
    ...checkAnswersContent,
    ...translations,
    form,
  };
};
