import { AlternativeServiceType, DocumentType, State, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { findDocument } from '../../../modules/document-download/proxy-list';
import type { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, userCase, serviceApplicationType, generalApplicationType }: CommonContent) => ({
  applicationDownload: {
    reference: 'Divorce-Application',
    link: `/downloads/${isDivorce ? 'divorce-application' : 'application-to-end-civil-partnership'}`,
    text: `View the ${isDivorce ? 'divorce application' : 'application to end your civil partnership'} (PDF)`,
  },
  serviceApplicationDownload: {
    reference: 'Service-application',
    link: '/downloads/service-application',
    text: `View your ${serviceApplicationType} application (PDF)`,
  },
  generalApplicationDownload: {
    reference: 'General-application',
    link: '/downloads/general-application',
    text: `View your ${generalApplicationType} application (PDF)`,
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
  deemedOrDispensedRefusedDownload: {
    reference:
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'dispense-with-service-refused'
        : userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DEEMED
          ? 'deemed-service-refused'
          : 'alternative-service-refused',
    link: `/downloads/${
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'dispense-with-service-refused'
        : userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DEEMED
          ? 'deemed-service-refused'
          : 'alternative-service-refused'
    }`,
    text: `View the court order refusing your application for
    ${
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'dispensed'
        : userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DEEMED
          ? 'deemed'
          : 'alternative'
    } service (PDF)`,
  },

  deemedOrDispensedDownload: {
    reference:
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'certificate-of-dispense-with-service'
        : 'certificate-of-deemed-as-service',

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
  conditionalOrderRefusalPdf: {
    reference: 'Refusal-Order',
    link: '/downloads/conditional-order-refusal',
    text: 'View the conditional order refusal (PDF)',
  },
  finalOrderApplicationDownload: {
    reference: 'Final-Order-Application',
    link: '/downloads/final-order-application',
    text: 'View the final order application (PDF)',
  },
  finalOrderGrantedDocumentDownload: {
    reference: 'Final-Order-Granted',
    link: '/downloads/final-order-granted',
    text: 'Download a copy of your final order (PDF)',
  },
});

// @TODO translations
const cy: typeof en = ({ isDivorce, userCase, serviceApplicationType, generalApplicationType }: CommonContent) => ({
  applicationDownload: {
    reference: 'Divorce-Application',
    link: `/downloads/${isDivorce ? 'divorce-application' : 'application-to-end-civil-partnership'}`,
    text: `Gweld y cais ${isDivorce ? 'am ysgariad' : 'i ddod â’ch partneriaeth sifil i ben'} (PDF)`,
  },
  serviceApplicationDownload: {
    reference: 'Service-application',
    link: '/downloads/service-application',
    text: `Gweld y cais am ${serviceApplicationType} (PDF)`,
  },
  generalApplicationDownload: {
    reference: 'General-application',
    link: '/downloads/general-application',
    text: `View your ${generalApplicationType} application (PDF)`,
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
  deemedOrDispensedRefusedDownload: {
    reference:
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'dispense-with-service-refused'
        : userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DEEMED
          ? 'deemed-service-refused'
          : 'alternative-service-refused',
    link: `/downloads/${
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'dispense-with-service-refused'
        : userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DEEMED
          ? 'deemed-service-refused'
          : 'alternative-service-refused'
    }`,
    text: `Gweld y gorchymyn llys yn gwrthod eich cais am
    ${
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'hepgor cyflwyno'
        : userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DEEMED
          ? 'gyflwyno tybiedig'
          : 'gyflwyno amgen'
    } (PDF)`,
  },

  deemedOrDispensedDownload: {
    reference:
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'certificate-of-dispense-with-service'
        : 'certificate-of-deemed-as-service',

    link: `/downloads/${
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'certificate-of-dispense-with-service'
        : 'certificate-of-deemed-as-service'
    }`,
    text: `Gweld y gorchymyn llys sy’n caniatáu eich cais am
    ${
      userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
        ? 'hepgor cyflwyno'
        : 'gyflwyno tybiedig'
    } (PDF)`,
  },
  certificateOfEntitlementDownload: {
    reference: 'Certificate-of-Entitlement',
    link: '/downloads/certificate-of-entitlement',
    text: 'Gweld y dystysgrif hawl (PDF)',
  },
  conditionalOrderGrantedDocumentDownload: {
    reference: 'Conditional-Order-Granted',
    link: '/downloads/conditional-order-granted',
    text: 'Gweld y gorchymyn amodol (PDF)',
  },
  conditionalOrderAnswersPdf: {
    reference: 'Conditional-Order-Answers',
    link: '/downloads/conditional-order-answers',
    text: 'Gweld y cais am orchymyn amodol (PDF) ',
  },
  conditionalOrderApplicationDownload: {
    reference: 'Conditional-Order-Application',
    link: '/downloads/conditional-order-application',
    text: 'Gweld y cais am orchymyn amodol (PDF) ',
  },
  conditionalOrderRefusalPdf: {
    reference: 'Refusal-Order',
    link: '/downloads/conditional-order-refusal',
    text: 'Gweld y gwrthodiad am orchymyn amodol (PDF)',
  },
  finalOrderApplicationDownload: {
    reference: 'Final-Order-Application',
    link: '/downloads/final-order-application',
    text: 'Gweld y cais am orchymyn terfynol (PDF)',
  },
  finalOrderGrantedDocumentDownload: {
    reference: 'Final-Order-Granted',
    link: '/downloads/final-order-granted',
    text: "Lawrlwythwch gopi o'r 'gorchymyn terfynol' (PDF)",
  },
});

const languages = {
  en,
  cy,
};

const getDownloadLogic: TranslationFn = content => {
  const { userCase } = content;

  const deemedOrDispensedService = userCase.alternativeServiceOutcomes?.find(
    alternativeServiceOutcome =>
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DEEMED ||
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DISPENSED
  );

  const deemedOrDispensedOrAlternativeService = userCase.alternativeServiceOutcomes?.find(
    alternativeServiceOutcome =>
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DEEMED ||
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DISPENSED ||
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.ALTERNATIVE_SERVICE
  );

  const hasRefusalOrder = [
    DocumentType.ALTERNATIVE_SERVICE_REFUSED,
    DocumentType.DEEMED_SERVICE_REFUSED,
    DocumentType.DISPENSE_WITH_SERVICE_REFUSED,
    DocumentType.BAILIFF_SERVICE_REFUSED,
  ].some(document => !!findDocument(userCase, document));

  const shouldHaveAccessToCoApplication = content.isJointApplication || !content.isApplicant2;

  const isAwaitingAmendedApplicationState = userCase.state === State.AwaitingAmendedApplication;

  return {
    hasDivorceOrDissolutionApplication: !!findDocument(userCase, DocumentType.APPLICATION),
    app1OnlineServiceAppInProgress:
      content.hasServiceApplicationInProgress && content.serviceApplicationSubmittedOnline && content.isApplicant2,
    app1OnlineGeneralApp:
      content.generalApplicationDate && content.generalApplicationSubmittedOnline && content.isApplicant2,
    isAosSubmitted:
      userCase.dateAosSubmitted &&
      (userCase.documentsUploaded?.find(doc => doc.value.documentType === DocumentType.RESPONDENT_ANSWERS) ||
        userCase.documentsGenerated?.find(doc => doc.value.documentType === DocumentType.RESPONDENT_ANSWERS)),
    hasCertificateOfService: userCase.alternativeServiceOutcomes?.find(
      alternativeServiceOutcome => alternativeServiceOutcome.value.successfulServedByBailiff === YesOrNo.YES
    ),
    hasCertificateOfDeemedOrDispensedServiceGranted: userCase.alternativeServiceOutcomes?.find(
      alternativeServiceOutcome =>
        deemedOrDispensedService && alternativeServiceOutcome.value.serviceApplicationGranted === YesOrNo.YES
    ),
    hasCertificateOfDeemedOrDispensedServiceRefused: userCase.alternativeServiceOutcomes?.find(
      alternativeServiceOutcome =>
        deemedOrDispensedOrAlternativeService &&
        alternativeServiceOutcome.value.serviceApplicationGranted === YesOrNo.NO &&
        alternativeServiceOutcome.value.refusalReason === 'refusalOrderToApplicant' &&
        hasRefusalOrder
    ),
    hasCertificateOfEntitlement: content.userCase.coCertificateOfEntitlementDocument,
    hasConditionalOrderGranted: content.userCase.coConditionalOrderGrantedDocument,
    hasConditionalOrderAnswersAndAccess:
      shouldHaveAccessToCoApplication &&
      content.userCase.documentsGenerated?.find(
        doc => doc.value.documentType === DocumentType.CONDITIONAL_ORDER_ANSWERS
      ),
    hasConditionalOrderApplicationAndAccess:
      shouldHaveAccessToCoApplication &&
      content.userCase.documentsGenerated?.find(
        doc => doc.value.documentType === DocumentType.CONDITIONAL_ORDER_APPLICATION
      ),
    hasFinalOrderGranted: content.userCase.documentsGenerated?.find(
      doc => doc.value.documentType === DocumentType.FINAL_ORDER_GRANTED
    ),
    isAwaitingAmendedApplicationStateAndAccess: isAwaitingAmendedApplicationState && shouldHaveAccessToCoApplication,
    hasFinalOrderApplicationAndFinalOrderRequested: userCase.documentsGenerated?.find(
      doc => doc.value.documentType === DocumentType.FINAL_ORDER_APPLICATION
    ),
  };
};

export const generateContent: TranslationFn = content => {
  return {
    ...getDownloadLogic(content),
    ...languages[content.language](content),
  };
};

export const downloadsAvailable = (content: CommonContent): boolean => {
  const downloadLogic = getDownloadLogic(content);
  return Object.values(downloadLogic).some(value => value === true);
};
