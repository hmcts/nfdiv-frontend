import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

import { generateContent as jointGenerateContent } from './joint/content';
import { generateContent as columnGenerateContent } from './right-column/content';
import { generateContent as soleGenerateContent } from './sole/content';

const en = ({ isDivorce, userCase, referenceNumber }: CommonContent) => ({
  title: `${userCase.applicant1FullNameOnCertificate} & ${userCase.applicant2FullNameOnCertificate}`,
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
  whatHappensNext: 'What happens next',
  generalAwaitingPronouncement: {
    line2:
      "A judge will 'pronounce' (read out) your conditional order at a hearing. The hearing will take place at [court name] on [date of hearing] at [time of hearing].",
    line3:
      'You do not need to come to the hearing, unless you want to object. You must contact the court by [hearing date - 7 days] if you want to attend.',
    line5:
      'You can view and download your ‘certificate of entitlement for a conditional order’. This is the document that says the court does not see any reason why you cannot [get divorced / end your civil partnership].',
  },
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
  const referenceNumber = content.userCase.id?.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
  return {
    ...languages[content.language]({ ...content, referenceNumber }),
    ...columnGenerateContent(content),
    ...(content.isJointApplication ? jointGenerateContent(content) : soleGenerateContent(content)),
  };
};
