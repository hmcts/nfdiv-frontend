import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { APPLICANT_2, CHECK_CONTACT_DETAILS } from '../../urls';

import { generateContent as jointGenerateContent } from './joint/content';
import { generateContent as soleGenerateContent } from './sole/content';

const en = ({ isDivorce, formState, referenceNumber, isApplicant2 }: CommonContent) => ({
  title: `${formState?.applicant1FullNameOnCertificate} & ${formState?.applicant2FullNameOnCertificate}`,
  referenceNumber: `Reference Number: ${referenceNumber}`,
  applicationSubmitted: 'Application submitted',
  response: 'Response',
  conditionalOrderApplication: 'Conditional order application',
  conditionalOrderGranted: 'Conditional order granted',
  finalOrderApplication: 'Final order application',
  applicationEnded: isDivorce ? 'Divorced' : 'Civil partnership ended',
  subHeading1: 'Latest update',
  subHeading2: 'Helpful information',
  line1:
    '<a class="govuk-link" href="https://www.gov.uk/money-property-when-relationship-ends" target="_blank">Find out about dividing money and property</a>',
  line2: `<a class="govuk-link" href="/downloads/${
    isDivorce ? 'divorce-application' : 'application-to-end-civil-partnership'
  }"
  download="${isDivorce ? 'Divorce-application' : 'Civil-partnership-application'}">View the ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  } (PDF)</a>`,
  reviewContactDetails: `<a class="govuk-link" href="${
    (isApplicant2 ? APPLICANT_2 : '') + CHECK_CONTACT_DETAILS
  }">Review your contact details</a>`,
  subHeading3: 'I want to...',
  subHeading4: 'Getting help',
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

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const referenceNumber = content.formState?.id?.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
  return {
    ...languages[content.language]({ ...content, referenceNumber }),
    ...(content.isJointApplication ? jointGenerateContent(content) : soleGenerateContent(content)),
  };
};
