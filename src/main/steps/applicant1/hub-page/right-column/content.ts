import { AlternativeServiceType, ApplicationType, DocumentType, State, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
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
    link: '/downloads/certificate-of-service',
    text: "View your 'certificate of service' (PDF)",
  },
  respondentAnswersDownload: {
    reference: 'Respondent-Answers',
    link: '/downloads/respondent-answers',
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
    link: '/downloads/certificate-of-entitlement',
    text: 'View the certificate of entitlement (PDF)',
  },
  conditionalOrderGrantedDocumentDownload: {
    reference: 'Conditional-Order-Granted',
    link: '/downloads/conditional-order-granted',
    text: 'View the conditional order (PDF)',
  },
  conditionalOrderAnswersPdf: {
    reference: 'Conditional-Order-Answers',
    link: '/downloads/conditional-order-answers',
    text: 'View the conditional order application (PDF)',
  },
  conditionalOrderApplicationDownload: {
    reference: 'Conditional-Order-Application',
    link: '/downloads/conditional-order-application',
    text: 'View the conditional order application (PDF)',
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
    link: '/downloads/certificate-of-service',
    text: "View your 'certificate of service' (PDF)",
  },
  respondentAnswersDownload: {
    reference: 'Respondent-Answers',
    link: '/downloads/respondent-answers',
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
    link: '/downloads/certificate-of-entitlement',
    text: 'View the certificate of entitlement (PDF)',
  },
  conditionalOrderGrantedDocumentDownload: {
    reference: 'Conditional-Order-Granted',
    link: '/downloads/conditional-order-granted',
    text: 'View the conditional order (PDF)',
  },
  conditionalOrderAnswersPdf: {
    reference: 'Conditional-Order-Answers',
    link: '/downloads/conditional-order-answers',
    text: 'View the conditional order application (PDF)',
  },
  conditionalOrderApplicationDownload: {
    reference: 'Conditional-Order-Application',
    link: '/downloads/conditional-order-application',
    text: 'View the conditional order application (PDF)',
  },
  finalOrderApplicationDownload: {
    reference: 'Final-Order-Application',
    link: '/downloads/final-order-application',
    text: 'View the final order application (PDF)',
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
  const { userCase, isJointApplication, language } = content;
  const aosSubmitted =
    !isJointApplication &&
    (userCase.applicant2StatementOfTruth ||
      userCase.aosStatementOfTruth ||
      userCase.documentsUploaded?.find(doc => doc.value.documentType === DocumentType.RESPONDENT_ANSWERS));
  const hasCertificateOfService = userCase.alternativeServiceOutcomes?.find(
    alternativeServiceOutcome => alternativeServiceOutcome.value.successfulServedByBailiff === YesOrNo.YES
  );
  const hasCertificateOfDeemedOrDispensedService = userCase.alternativeServiceOutcomes?.find(
    alternativeServiceOutcome =>
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DEEMED ||
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DISPENSED
  );
  const hasCertificateOfEntitlement = userCase.coCertificateOfEntitlementDocument;
  const hasConditionalOrderGranted = userCase.coConditionalOrderGrantedDocument;
  const hasConditionalOrderAnswers = userCase.documentsGenerated?.find(
    doc => doc.value.documentType === DocumentType.CONDITIONAL_ORDER_ANSWERS
  );
  const hasConditionalOrderApplication = userCase.documentsGenerated?.find(
    doc => doc.value.documentType === DocumentType.CONDITIONAL_ORDER_APPLICATION
  );
  const hasFinalOrderApplication =
    userCase.documentsGenerated?.find(doc => doc.value.documentType === DocumentType.FINAL_ORDER_APPLICATION) &&
    userCase.state === State.FinalOrderRequested;
  return {
    aosSubmitted,
    hasCertificateOfService,
    hasCertificateOfDeemedOrDispensedService,
    hasCertificateOfEntitlement,
    hasConditionalOrderAnswers,
    hasConditionalOrderGranted,
    hasConditionalOrderApplication,
    hasFinalOrderApplication,
    ...languages[language](content),
  };
};
