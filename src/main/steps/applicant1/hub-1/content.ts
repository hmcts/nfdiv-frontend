import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { State, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import type { CommonContent } from '../../common/common.content';

dayjs.extend(advancedFormat);

const en = ({ isDivorce, formState, partner, referenceNumber }: CommonContent) => ({
  title: formState?.applicant1FullNameOnCertificate + ' & ' + formState?.applicant2FullNameOnCertificate,
  referenceNumber: `Reference Number: ${referenceNumber}`,
  applicationSubmitted: 'Application submitted',
  conditionalOrderApplication: 'Conditional order application',
  conditionalOrderGranted: 'Conditional order granted',
  finalOrderApplication: 'Final order application',
  applicationEnded: isDivorce ? 'Divorced' : 'Civil partnership ended',
  subHeading1: 'Latest update',
  subHeading2: 'Helpful information',
  line1: `Your application ${isDivorce ? 'for divorce ' : 'to end your civil partnership'} has been submitted
  and checked by court staff. It has been sent to you and your ${partner} by ${
    formState?.applicant1AgreeToReceiveEmails ? 'email' : 'post'
  }.`,
  line2: `You should confirm that you have received your application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  }`,
  line3:
    ' <a class="govuk-link" href="https://www.gov.uk/money-property-when-relationship-ends" target="_blank">Find out about dividing money and property</a>',
  line4: ` <a class="govuk-link" href="/downloads/divorce-application" download="${
    isDivorce ? 'Divorce-application' : 'Civil-partnership-application'
  }">View the ${isDivorce ? 'divorce application' : 'application to end your civil partnership'} (PDF)</a>`,
  line5: ' <a class="govuk-link" href="https://www.gov.uk/call-charges">View or update my contact details</a>',
  email: `<strong>Email</strong><br> <a class="govuk-link" href="mailto:${
    isDivorce ? 'contactdivorce@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk'
  }">${isDivorce ? 'contactdivorce@justice.gov.uk' : 'civilpartnership.case@justice.gov.uk'}</a>`,
  subHeading3: 'I want to...',
  confirmReceipt: 'Confirm receipt',
  subHeading4: 'Getting help',
  telephone: '<strong>Phone</strong></br> 0300 303 0642</br> (Monday to Friday, 8am to 8PM, Saturday 8AM to 2PM)',
  post:
    '<strong>Post</strong></br>' +
    'Courts and Tribunals Service Centre</br>' +
    'Digital Divorce</br>' +
    'PO Box 12706</br>' +
    'Harlow</br>' +
    'CM20 9QT',
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
  const progressionIndex = [
    State.Holding,
    State.Holding && content.formState?.applicant1LegalProceedings === YesOrNo.YES,
    State.AwaitingLegalAdvisorReferral,
    State.AwaitingPronouncement,
    State.FinalOrderComplete,
  ].indexOf(content.formState?.state as State);
  const referenceNumber = content.formState?.id?.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
  return {
    ...languages[content.language]({ ...content, referenceNumber }),
    progressionIndex,
  };
};
