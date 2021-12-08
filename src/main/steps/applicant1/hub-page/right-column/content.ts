import { AlternativeServiceType, ApplicationType, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { CommonContent } from '../../../common/common.content';
import { APPLICANT_2, CHECK_CONTACT_DETAILS, RESPONDENT } from '../../../urls';

const en = ({ isDivorce, isApplicant2, userCase }: CommonContent) => ({
  applicationDownloadLink: `<a class="govuk-link" href="/downloads/${
    isDivorce ? 'divorce-application' : 'application-to-end-civil-partnership'
  }"
  download="${isDivorce ? 'Divorce-application' : 'Civil-partnership-application'}">View the ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } (PDF)</a>`,
  certificateOfServiceDownloadLink:
    '<a class="govuk-link" href="/downloads/certificate-of-service" download="Certificate-of-service">View your ‘certificate of service’ (PDF)</a>',
  respondentAnswersDownloadLink: `<a class="govuk-link" href="/downloads/respondent-answers"
  download="Respondent-answers">View the response to the ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } (PDF)</a>`,
  deemedOrDispensedDownloadLink: `View the court order granting your application for
  ${
    userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
      ? 'dispensed'
      : 'deemed'
  } service (PDF)`,
  deemedOrDispensedDownloadReference: `/downloads/${
    userCase.alternativeServiceOutcomes?.[0].value.alternativeServiceType === AlternativeServiceType.DISPENSED
      ? 'certificate-of-dispense-with-service'
      : 'certificate-of-deemed-as-service'
  }`,
  reviewContactDetails: `<a class="govuk-link" href="${
    (isApplicant2 ? (userCase?.applicationType === ApplicationType.SOLE_APPLICATION ? RESPONDENT : APPLICANT_2) : '') +
    CHECK_CONTACT_DETAILS
  }">Review your contact details</a>`,
  iWantTo: 'I want to...',
  gettingHelp: 'Getting help',
  telephone: '<strong>Phone</strong></br> 0300 303 0642</br> (Monday to Friday, 8am to 8PM, Saturday 8AM to 2PM)',
  email: `<strong>Email</strong><br>
    <a class="govuk-link" href="mailto:${
      isDivorce ? 'contactdivorce@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk'
    }">${isDivorce ? 'contactdivorce@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk'}</a>`,
  post: `
    <strong>Post</strong></br>
    Courts and Tribunals Service Centre</br>
    Digital Divorce</br>
    PO Box 12706</br>
    Harlow</br>
    CM20 9QT`,
  whatHappensNext: 'What happens next',
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const aosSubmitted = !content.isJointApplication && content.userCase.applicant2IBelieveApplicationIsTrue;
  const hasCertificateOfService = content.userCase.alternativeServiceOutcomes?.find(
    alternativeServiceOutcome => alternativeServiceOutcome.value.successfulServedByBailiff === YesOrNo.YES
  );
  const hasCertificateOfDeemedOrDispensedService = content.userCase.alternativeServiceOutcomes?.find(
    alternativeServiceOutcome =>
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DEEMED ||
      alternativeServiceOutcome.value.alternativeServiceType === AlternativeServiceType.DISPENSED
  );
  return {
    aosSubmitted,
    hasCertificateOfService,
    hasCertificateOfDeemedOrDispensedService,
    ...languages[content.language](content),
  };
};
