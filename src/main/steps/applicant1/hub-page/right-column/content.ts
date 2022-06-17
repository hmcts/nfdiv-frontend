import { AlternativeServiceType, ApplicationType, DocumentType, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { CommonContent } from '../../../common/common.content';
import { APPLICANT_2, CHECK_CONTACT_DETAILS, RESPONDENT } from '../../../urls';

const en = ({ isDivorce, isApplicant2, userCase }: CommonContent) => ({
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
  reviewContactDetails: `<a class="govuk-link" href="${
    (isApplicant2 ? (userCase?.applicationType === ApplicationType.SOLE_APPLICATION ? RESPONDENT : APPLICANT_2) : '') +
    CHECK_CONTACT_DETAILS
  }">Review your contact details</a>`,
  iWantTo: 'I want to...',
  gettingHelp: 'Getting help',
  telephone: {
    heading: 'Phone',
    openingTimes: '(Monday to Friday, 8am to 8pm, Saturday 8am to 2pm)',
  },
  email: 'Email',
  post: 'Post',
  whatHappensNext: 'What happens next',
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const aosSubmitted =
    !content.isJointApplication &&
    (content.userCase.applicant2StatementOfTruth ||
      content.userCase.aosStatementOfTruth ||
      content.userCase.documentsUploaded?.find(doc => doc.value.documentType === DocumentType.RESPONDENT_ANSWERS));
  const hasCertificateOfService = content.userCase.alternativeServiceOutcomes?.find(
    alternativeServiceOutcome => alternativeServiceOutcome.value.successfulServedByBailiff === YesOrNo.YES
  );
  const hasCertificateOfDeemedOrDispensedService = content.userCase.alternativeServiceOutcomes?.find(
    alternativeServiceOutcome =>
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DEEMED ||
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DISPENSED
  );
  const hasCertificateOfEntitlement = content.userCase.coCertificateOfEntitlementDocument;
  return {
    aosSubmitted,
    hasCertificateOfService,
    hasCertificateOfDeemedOrDispensedService,
    hasCertificateOfEntitlement,
    ...languages[content.language](content),
  };
};
