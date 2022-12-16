import { AlternativeServiceType, ApplicationType, DocumentType, State, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { downloadEndpoints } from '../../../../modules/document-download/downloadEndpoints';
import { CommonContent } from '../../../common/common.content';
import { APPLICANT_2, CHECK_CONTACT_DETAILS, RESPONDENT } from '../../../urls';

const en = ({ isDivorce, isApplicant2, userCase, telephoneNumber, openingTimes }: CommonContent) => ({
  applicationDownload: {
    reference: 'Divorce-Application',
    link: `/downloads/${isDivorce ? 'divorce-application' : 'application-to-end-civil-partnership'}`,
    text: `View the ${isDivorce ? 'divorce application' : 'application to end your civil partnership'} (PDF)`,
  },
  certificateOfServiceDownload: {
    reference: 'Certificate-of-Service',
    link: downloadEndpoints.CERTIFICATE_OF_SERVICE,
    text: "View your 'certificate of service' (PDF)",
  },
  respondentAnswersDownload: {
    reference: 'Respondent-Answers',
    link: downloadEndpoints.RESPONDENT_ANSWERS,
    text: `View the response to the ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } (PDF)`,
  },
  deemedOrDispensedDownload: {
    reference: 'Certificate-of-Service',
    link: `/downloads/${
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'certificate-of-dispense-with-service'
        : 'certificate-of-deemed-as-service'
    }`,
    text: `View the court order granting your application for
    ${
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'dispensed'
        : 'deemed'
    } service (PDF)`,
  },
  certificateOfEntitlementDownload: {
    reference: 'Certificate-of-Entitlement',
    link: downloadEndpoints.CERTIFICATE_OF_ENTITLEMENT,
    text: 'View the certificate of entitlement (PDF)',
  },
  conditionalOrderGrantedDocumentDownload: {
    reference: 'Conditional-Order-Granted',
    link: downloadEndpoints.CONDITIONAL_ORDER_GRANTED,
    text: 'View the conditional order (PDF)',
  },
  conditionalOrderAnswersPdf: {
    reference: 'Conditional-Order-Answers',
    link: downloadEndpoints.CONDITIONAL_ORDER_ANSWERS,
    text: 'View the conditional order application (PDF)',
  },
  conditionalOrderApplicationDownload: {
    reference: 'Conditional-Order-Application',
    link: downloadEndpoints.CONDITIONAL_ORDER_APPLICATION,
    text: 'View the conditional order application (PDF)',
  },
  conditionalOrderRefusalPdf: {
    reference: 'Refusal-Order',
    link: downloadEndpoints.CONDITIONAL_ORDER_REFUSAL,
    text: 'View the conditional order refusal (PDF)',
  },
  finalOrderGrantedDocumentDownload: {
    reference: 'Final-Order-Granted',
    link: downloadEndpoints.FINAL_ORDER_GRANTED,
    text: 'Download a copy of your final order (PDF)',
  },
  reviewContactDetails: `<a class="govuk-link" href="${
    (isApplicant2 ? (userCase?.applicationType === ApplicationType.SOLE_APPLICATION ? RESPONDENT : APPLICANT_2) : '') +
    CHECK_CONTACT_DETAILS
  }">Review your contact details</a>`,
  iWantTo: 'I want to...',
  gettingHelp: 'Getting help',
  telephone: {
    heading: 'Phone',
    openingTimes: `(${openingTimes})`,
    number: telephoneNumber,
  },
  email: 'Email',
  post: 'Post',
});

// @TODO translations
const cy: typeof en = ({ isDivorce, isApplicant2, userCase, telephoneNumber, openingTimes }: CommonContent) => ({
  applicationDownload: {
    reference: 'Divorce-Application',
    link: `/downloads/${isDivorce ? 'divorce-application' : 'application-to-end-civil-partnership'}`,
    text: `Gweld y cais ${isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'} (PDF)`,
  },
  certificateOfServiceDownload: {
    reference: 'Certificate-of-Service',
    link: downloadEndpoints.CERTIFICATE_OF_SERVICE,
    text: "View your 'certificate of service' (PDF)",
  },
  respondentAnswersDownload: {
    reference: 'Respondent-Answers',
    link: downloadEndpoints.RESPONDENT_ANSWERS,
    text: `Gweld yr ymateb i'r cais ${isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'} (PDF)`,
  },
  deemedOrDispensedDownload: {
    reference: 'Certificate-of-Service',
    link: `/downloads/${
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'certificate-of-dispense-with-service'
        : 'certificate-of-deemed-as-service'
    }`,
    text: `View the court order granting your application for
    ${
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'dispensed'
        : 'deemed'
    } service (PDF)`,
  },
  certificateOfEntitlementDownload: {
    reference: 'Certificate-of-Entitlement',
    link: downloadEndpoints.CERTIFICATE_OF_ENTITLEMENT,
    text: 'Gweld y dystysgrif hawl (PDF)',
  },
  conditionalOrderGrantedDocumentDownload: {
    reference: 'Conditional-Order-Granted',
    link: downloadEndpoints.CONDITIONAL_ORDER_GRANTED,
    text: 'Gweld y gorchymyn amodol (PDF)',
  },
  conditionalOrderAnswersPdf: {
    reference: 'Conditional-Order-Answers',
    link: downloadEndpoints.CONDITIONAL_ORDER_ANSWERS,
    text: 'Gweld y cais am orchymyn amodol (PDF) ',
  },
  conditionalOrderApplicationDownload: {
    reference: 'Conditional-Order-Application',
    link: downloadEndpoints.CONDITIONAL_ORDER_APPLICATION,
    text: 'Gweld y cais am orchymyn amodol (PDF) ',
  },
  conditionalOrderRefusalPdf: {
    reference: 'Refusal-Order',
    link: downloadEndpoints.CONDITIONAL_ORDER_REFUSAL,
    text: 'View the conditional order refusal (PDF)',
  },
  finalOrderApplicationDownload: {
    reference: 'Final-Order-Application',
    link: downloadEndpoints.FINAL_ORDER_APPLICATION,
    text: 'View the final order application (PDF)',
  },
  finalOrderGrantedDocumentDownload: {
    reference: 'Final-Order-Granted',
    link: downloadEndpoints.FINAL_ORDER_GRANTED,
    text: "Lawrlwythwch gopi o'r 'gorchymyn terfynol' (PDF)",
  },
  reviewContactDetails: `<a class="govuk-link" href="${
    (isApplicant2 ? (userCase?.applicationType === ApplicationType.SOLE_APPLICATION ? RESPONDENT : APPLICANT_2) : '') +
    CHECK_CONTACT_DETAILS
  }">Adolygu eich manylion cyswllt</a>`,
  iWantTo: 'Rwyf eisiau...',
  gettingHelp: 'Cael help',
  telephone: {
    heading: 'Rhif ffôn',
    openingTimes: `(${openingTimes})`,
    number: telephoneNumber,
  },
  email: 'E-bost',
  post: "Drwy'r post",
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { userCase } = content;
  const isAosSubmitted =
    userCase.dateAosSubmitted &&
    (userCase.documentsUploaded?.find(doc => doc.value.documentType === DocumentType.RESPONDENT_ANSWERS) ||
      userCase.documentsGenerated?.find(doc => doc.value.documentType === DocumentType.RESPONDENT_ANSWERS));
  const hasCertificateOfService = userCase.alternativeServiceOutcomes?.find(
    alternativeServiceOutcome => alternativeServiceOutcome.value.successfulServedByBailiff === YesOrNo.YES
  );
  const isAwaitingAmendedApplicationState = userCase.state === State.AwaitingAmendedApplication;
  const hasCertificateOfDeemedOrDispensedService = userCase.alternativeServiceOutcomes?.find(
    alternativeServiceOutcome =>
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DEEMED ||
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DISPENSED
  );
  const hasCertificateOfEntitlement = content.userCase.coCertificateOfEntitlementDocument;
  const hasConditionalOrderGranted = content.userCase.coConditionalOrderGrantedDocument;
  const hasFinalOrderGranted = content.userCase.documentsGenerated?.find(
    doc => doc.value.documentType === DocumentType.FINAL_ORDER_GRANTED
  );
  const hasConditionalOrderAnswers = content.userCase.documentsGenerated?.find(
    doc => doc.value.documentType === DocumentType.CONDITIONAL_ORDER_ANSWERS
  );
  const hasConditionalOrderApplication = content.userCase.documentsGenerated?.find(
    doc => doc.value.documentType === DocumentType.CONDITIONAL_ORDER_APPLICATION
  );
  const hasFinalOrderApplicationAndFinalOrderRequested = userCase.documentsGenerated?.find(
    doc => doc.value.documentType === DocumentType.FINAL_ORDER_APPLICATION
  );

  return {
    isAosSubmitted,
    hasCertificateOfService,
    hasCertificateOfDeemedOrDispensedService,
    hasCertificateOfEntitlement,
    isAwaitingAmendedApplicationState,
    hasConditionalOrderAnswers,
    hasConditionalOrderGranted,
    hasConditionalOrderApplication,
    hasFinalOrderApplicationAndFinalOrderRequested,
    hasFinalOrderGranted,
    ...languages[content.language](content),
  };
};
