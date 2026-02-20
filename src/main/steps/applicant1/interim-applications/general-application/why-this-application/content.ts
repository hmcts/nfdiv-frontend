import { isEmpty } from 'lodash';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

const en = () => ({
  title: 'Why are you making this application?',
  line1: 'Provide as much information as you can. This will help the court decide whether to grant your application.',
  errors: {
    applicant1GenAppReason: {
      required: 'You must explain why you are making this application.',
    },
  },
});

// @TODO translations
const cy = () => ({
  title: 'Why are you making this application?',
  line1: 'Provide as much information as you can. This will help the court decide whether to grant your application.',
  errors: {
    applicant1GenAppReason: {
      required: 'You must explain why you are making this application.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1GenAppReason: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.title,
      labelHidden: true,
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
