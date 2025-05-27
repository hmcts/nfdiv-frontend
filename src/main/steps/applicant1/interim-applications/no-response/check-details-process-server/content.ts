import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { HUB_PAGE } from '../../../../urls';

const en = ({ isDivorce }: CommonContent, applicant1EmailAddress: string | undefined) => ({
  title: 'Check your details',
  line1: `We will email you the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } at ${applicant1EmailAddress}`,
  line2: `If this is not correct you can <a class="govuk-link" href="${HUB_PAGE}">update your email address on your hub</a>.`,
});

// @TODO translations should be verified
const cy = ({ isDivorce }: CommonContent, applicant1EmailAddress: string | undefined) => ({
  title: 'Check your details',
  line1: `We will email you the ${
    isDivorce ? 'divorce papers' : 'papers to end your civil partnership'
  } at ${applicant1EmailAddress}`,
  line2: `If this is not correct you can <a class="govuk-link" href="${HUB_PAGE}">update your email address on your hub</a>.`,
});

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
  const translations = languages[content.language](content, content.userCase.applicant1Email);
  return {
    ...translations,
    form,
  };
};
