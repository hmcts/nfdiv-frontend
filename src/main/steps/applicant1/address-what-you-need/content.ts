import config from 'config';

import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = ({ isDivorce, partner }) => ({
  title: 'How to progress if you cannot provide an address',
  line1: `If you cannot provide an address, you’ll need to complete an additional application to the court to progress your ${
    isDivorce ? 'divorce' : 'application to end civil partnership'
  } a different way.`,
  line2: `You’ll be able to do this once you’ve submitted your ${
    isDivorce ? 'divorce application' : 'application to end civil partnership'
  }.`,
  line3: `This will cost £58, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  line4:
    'If you are able to find an address after submitting this application, you will be given the option to update their details.',
  foundTheirAddress: `Have you been able to find your ${partner}’s address?`,
});

//TODO Welsh translation required
const cy: typeof en = ({ isDivorce, partner }) => ({
  title: 'How to progress if you cannot provide an address',
  line1: `If you cannot provide an address, you’ll need to complete an additional application to the court to progress your ${
    isDivorce ? 'divorce' : 'application to end civil partnership'
  } a different way.`,
  line2: `You’ll be able to do this once you’ve submitted your ${
    isDivorce ? 'divorce application' : 'application to end civil partnership'
  }.`,
  line3: `This will cost £58, but you may be able to <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">get help paying this fee (opens in a new tab)</a>.`,
  line4:
    'If you are able to find an address after submitting this application, you will be given the option to update their details.',
  foundTheirAddress: `Have you been able to find your ${partner}’s address?`,
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
