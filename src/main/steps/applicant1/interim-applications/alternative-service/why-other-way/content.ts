import { isEmpty } from 'lodash';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

const en = () => ({
  title: 'Why are you applying for alternative service?',
  line1:
    'Explain why you have not been able to send the papers. Give as much detail as you can. This information may be considered by a judge as part of your application.',
  errors: {
    applicant1AlternativeReason: {
      required: 'You must provide a reason before continuing.',
    },
  },
});

// @TODO translations
const cy = () => ({
  title: 'Why are you applying for alternative service?',
  line1:
    'Explain why you have not been able to send the papers. Give as much detail as you can. This information may be considered by a judge as part of your application.',
  errors: {
    applicant1AlternativeReason: {
      required: 'You must provide a reason before continuing.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1AlternativeReason: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.responseLabel,
      validator: value => {
        const hasEnteredDetails = !isEmpty(value);
        if (!hasEnteredDetails) {
          return 'required';
        }
      },
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
