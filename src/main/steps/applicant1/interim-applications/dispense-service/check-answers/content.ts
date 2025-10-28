import striptags from 'striptags';

import { getFormattedCaseDate } from '../../../../../app/case/answers/formatDate';
import { Checkbox } from '../../../../../app/case/case';
import { YesOrNo } from '../../../../../app/case/definition';
import { getFilename } from '../../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent, generateCommonContent } from '../../../../common/common.content';
import { getDispenseLogicalTests } from '../../../../dispenseServiceApplicationSequence';
import * as urls from '../../../../urls';
import {
  form as checkAnswersForm,
  generateContent as checkAnswersGenerateContent,
} from '../../common/check-answers/content';
import { generateContent as awarePartnerAddressContent } from '../aware-partner-address/content';
import { generateContent as childMaintenanceContent } from '../child-maintenance/content';
import { generateContent as childrenContactContent } from '../children-contact/content';
import { generateContent as childrenFamilyContent } from '../children-family/content';
import { generateContent as emailContent } from '../email/content';
import { generateContent as employmentContactContent } from '../employment-contact/content';
import { generateContent as finalOrderSearchContent } from '../final-order-search/content';
import { generateContent as lastDateContent } from '../last-date/content';
import { generateContent as phoneNumberContent } from '../phone-number/content';
import { generateContent as searchingOnlineContent } from '../searching-online/content';
import { generateContent as tracingAgentContent } from '../tracing-agent/content';
import { generateContent as tracingOnlineContent } from '../tracing-online/content';

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
  whyNoFinalOrderSearch: `${urls.FINAL_ORDER_SEARCH_DISPENSE}`,
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

const en = (stepAnswers, { capitalisedPartner, isDivorce, partner }: CommonContent) => ({
  stepQuestions: {
    useHwf: 'Help paying the application fee',
    hwfReference: 'Help with fees reference number',
    didYouLiveTogether: `Did you and your ${partner} live together?`,
    dateLastLivedTogether: 'The date you last lived together',
    whereLivedTogether: `Where did you and your ${partner} live together?`,
    wherePartnerLivedAfterParting: `Are you aware of where your ${partner} lived after parting?`,
    partnerAddress1: `${capitalisedPartner}'s address 1`,
    partnerAddress2: `${capitalisedPartner}'s address 2`,
    whenPartnerLastSeen: `When was your ${partner} last seen or heard of?`,
    partnerLastSeenDescription: `Describe the last time you saw or heard of your ${partner}`,
    finalOrderSearch: `Have you searched for an existing ${isDivorce ? 'decree absolute or ' : ''}final order?`,
    whyNoFinalOrderSearch: 'Explain why you have not requested a search',
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

const cy: typeof en = (stepAnswers, { isDivorce, partner }: CommonContent) => ({
  stepQuestions: {
    useHwf: 'Help i dalu’r ffi gwneud cais',
    hwfReference: 'Cyfeirnod help i dalu ffioedd',
    didYouLiveTogether: `A oeddech chi a’ch ${partner} yn byw gyda’ch gilydd?`,
    dateLastLivedTogether: 'Y dyddiad yr oeddech yn byw gyda’ch gilydd ddiwethaf',
    whereLivedTogether: `Lle oeddech chi a’ch ${partner} yn byw gyda’ch gilydd?`,
    wherePartnerLivedAfterParting: `Ydych chi’n ymwybodol ble wnaeth eich ${partner} fyw ar ôl gwahanu?`,
    partnerAddress1: `Cyfeiriad 1 eich ${partner}`,
    partnerAddress2: `Cyfeiriad 2 eich ${partner}`,
    whenPartnerLastSeen: `Pa bryd y gwelwyd neu y clywyd am eich ${partner} ddiwethaf?`,
    partnerLastSeenDescription: `Disgrifiwch y tro diwethaf i chi weld neu glywed am eich ${partner}`,
    finalOrderSearch: `Ydych chi wedi chwilio am ${
      isDivorce ? 'ddyfarniad absoliwt neu ' : ''
    }orchymyn terfynol presennol?`,
    whyNoFinalOrderSearch: 'Eglurwch pam nad ydych wedi gofyn am chwilio',
    partnerEmail: `Oes gennych chi unrhyw gyfeiriadau e-bost i’ch ${partner}?`,
    emailDetails: 'Rhowch y cyfeiriadau e-bost ac unrhyw gyswllt blaenorol.',
    partnerPhone: `Oes gennych chi unrhyw rifau ffôn i’ch ${partner}?`,
    phoneDetails: 'Rhowch y rhifau ffôn ac unrhyw gyswllt blaenorol.',
    tracingAgent: `A ydych wedi ceisio defnyddio asiant olrhain i ddod o hyd i’ch ${partner}?`,
    tracingAgentDetails: 'Beth oedd canlyniadau eich chwiliad asiant olrhain?',
    whyNoTracingAgent: 'Eglurwch pam nad ydych wedi defnyddio asiantau olrhain',
    tracingOnline: `Ydych chi wedi ceisio olrhain eich ${partner} ar-lein?`,
    tracingOnlineDetails: 'Beth oedd canlyniadau eich chwiliadau ar-lein?',
    whyNoTracingOnline: `Eglurwch pam nad ydych wedi ceisio olrhain eich ${partner} ar-lein`,
    onlineSearch: `A ydych wedi ceisio dod o hyd i fanylion eich ${partner} ar-lein drwy chwilio ar y rhyngrwyd?`,
    onlineSearchDetails: 'Beth oedd canlyniadau eich chwiliadau ar-lein?',
    whyNoOnlineSearch: `Eglurwch pam nad ydych wedi ceisio chwilio am eich ${partner} ar-lein`,
    employer: `A ydych wedi ceisio cysylltu â chyflogwr hysbys diwethaf eich ${partner}? `,
    employerName: 'Enw’r cyflogwr',
    employerAddress: 'Cyfeiriad y cyflogwr',
    partnerOccupation: `Galwedigaeth eich ${partner}`,
    employerResultsDescription: 'Canlyniadau eich ymholiad i’r cyflogwr',
    whyNoEmployer: 'Eglurwch pam nad ydych wedi ceisio cysylltu â’r cyflogwr hysbys diwethaf',
    childrenOfTheFamily: 'A oes unrhyw blant o’r teulu?',
    partnerContact: `A oes gan eich ${partner} unrhyw gyswllt ȃ nhw?`,
    whenPartnerContact: `Pryd a sut mae eich ${partner} yn cael cysylltiad gyda nhw?`,
    partnerLastContactDetails: `Pryd cafodd eich ${partner} gyswllt ȃ nhw ddiwethaf?`,
    childMaintenance: 'A oes yna orchymyn llys neu gyfrifiad Gwasanaeth Cynhaliaeth Plant ar gyfer cynhaliaeth plant?',
    childMaintenanceDetails: `Eglurwch ganlyniadau unrhyw ymholiadau a wnaed i’r llys neu i’r Gwasanaeth Cynhaliaeth Plant am leoliad eich ${partner}`,
    friendsOrRelatives: `Ydych chi wedi gallu cysylltu ag unrhyw ffrindiau neu berthnasau eich ${partner}?`,
    otherEnquiries: `Pa ymholiadau eraill a wnaethoch, neu pa wybodaeth sydd gennych, ynghylch ble mae eich ${partner}?`,
    uploadedFiles: 'Ffeiliau wedi’u huwchlwytho',
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

const formatYesOrNo = (pageContent, field: YesOrNo | undefined) => {
  if (field === undefined) {
    return undefined;
  }
  if (!pageContent.yes) {
    pageContent.yes = YesOrNo.YES;
  }
  if (!pageContent.no) {
    pageContent.no = YesOrNo.NO;
  }
  return field === YesOrNo.YES ? pageContent.yes : pageContent.no;
};

const stepAnswers = (content, uploads) => ({
  useHwf: formatYesOrNo(generateCommonContent(content), content.userCase.applicant1InterimAppsUseHelpWithFees),
  hwfReference: content.userCase.applicant1InterimAppsHwfRefNumber,
  didYouLiveTogether: formatYesOrNo(lastDateContent(content), content.userCase.applicant1DispenseLiveTogether),
  dateLastLivedTogether:
    getFormattedCaseDate(content.userCase.applicant1DispenseLastLivedTogetherDate, content.language) || undefined,
  whereLivedTogether: formatAddress(
    content.userCase.applicant1DispenseLivedTogetherAddress1,
    content.userCase.applicant1DispenseLivedTogetherAddress2,
    content.userCase.applicant1DispenseLivedTogetherAddress3,
    content.userCase.applicant1DispenseLivedTogetherAddressTown,
    content.userCase.applicant1DispenseLivedTogetherAddressCounty,
    content.userCase.applicant1DispenseLivedTogetherAddressPostcode,
    content.userCase.applicant1DispenseLivedTogetherAddressCountry
  ),
  wherePartnerLivedAfterParting: formatYesOrNo(
    awarePartnerAddressContent(content),
    content.userCase.applicant1DispenseAwarePartnerLived
  ),
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
  whenPartnerLastSeen: getFormattedCaseDate(
    content.userCase.applicant1DispensePartnerLastSeenOrHeardOfDate,
    content.language
  ),
  partnerLastSeenDescription: content.userCase.applicant1DispensePartnerLastSeenDescription,
  finalOrderSearch: formatYesOrNo(
    finalOrderSearchContent(content),
    content.userCase.applicant1DispenseHaveSearchedFinalOrder
  ),
  whyNoFinalOrderSearch: content.userCase.applicant1DispenseWhyNoFinalOrderSearch,
  partnerEmail: formatYesOrNo(emailContent(content), content.userCase.applicant1DispenseHavePartnerEmailAddresses),
  emailDetails: content.userCase.applicant1DispensePartnerEmailAddresses,
  partnerPhone: formatYesOrNo(phoneNumberContent(content), content.userCase.applicant1DispenseHavePartnerPhoneNumbers),
  phoneDetails: content.userCase.applicant1DispensePartnerPhoneNumbers,
  tracingAgent: formatYesOrNo(tracingAgentContent(content), content.userCase.applicant1DispenseTriedTracingAgent),
  tracingAgentDetails: content.userCase.applicant1DispenseTracingAgentResults,
  whyNoTracingAgent: content.userCase.applicant1DispenseWhyNoTracingAgent,
  tracingOnline: formatYesOrNo(tracingOnlineContent(content), content.userCase.applicant1DispenseTriedTracingOnline),
  tracingOnlineDetails: content.userCase.applicant1DispenseTracingOnlineResults,
  whyNoTracingOnline: content.userCase.applicant1DispenseWhyNoTracingOnline,
  onlineSearch: formatYesOrNo(searchingOnlineContent(content), content.userCase.applicant1DispenseTriedSearchingOnline),
  onlineSearchDetails: content.userCase.applicant1DispenseSearchingOnlineResults,
  whyNoOnlineSearch: content.userCase.applicant1DispenseWhyNoSearchingOnline,
  employer: formatYesOrNo(
    employmentContactContent(content),
    content.userCase.applicant1DispenseTriedContactingEmployer
  ),
  employerName: content.userCase.applicant1DispenseEmployerName,
  employerAddress: content.userCase.applicant1DispenseEmployerAddress,
  partnerOccupation: content.userCase.applicant1DispensePartnerOccupation,
  employerResultsDescription: content.userCase.applicant1DispenseContactingEmployerResults,
  whyNoEmployer: content.userCase.applicant1DispenseWhyNoContactingEmployer,
  childrenOfTheFamily: formatYesOrNo(
    childrenFamilyContent(content),
    content.userCase.applicant1DispenseChildrenOfFamily
  ),
  partnerContact: formatYesOrNo(
    childrenContactContent(content),
    content.userCase.applicant1DispensePartnerContactWithChildren
  ),
  whenPartnerContact: content.userCase.applicant1DispenseHowPartnerContactChildren,
  partnerLastContactDetails: content.userCase.applicant1DispensePartnerLastContactChildren,
  childMaintenance: formatYesOrNo(
    childMaintenanceContent(content),
    content.userCase.applicant1DispenseChildMaintenanceOrder
  ),
  childMaintenanceDetails: content.userCase.applicant1DispenseChildMaintenanceResults,
  friendsOrRelatives: content.userCase.applicant1DispenseContactFriendsOrRelativesDetails,
  otherEnquiries: content.userCase.applicant1DispenseOtherEnquiries,
  ...uploads,
});

export const generateContent: TranslationFn = content => {
  const checkAnswersContent = checkAnswersGenerateContent(content);
  const uploadedDocsFilenames = content.userCase.applicant1InterimAppsEvidenceDocs?.map(item =>
    getFilename(item.value)
  );
  const cannotUploadDocs =
    content.userCase.applicant1InterimAppsCannotUploadDocs === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;

  const dispenseLogic = getDispenseLogicalTests(content.userCase);

  const uploads = {
    cannotUploadDocs: dispenseLogic.showUploadEvidence ? cannotUploadDocs : undefined,
    uploadedDocsFilenames: dispenseLogic.showUploadEvidence ? uploadedDocsFilenames : undefined,
  };

  const translations = languages[content.language](stepAnswers(content, uploads), content);
  return {
    ...checkAnswersContent,
    ...translations,
    form,
    ...uploads,
  };
};
