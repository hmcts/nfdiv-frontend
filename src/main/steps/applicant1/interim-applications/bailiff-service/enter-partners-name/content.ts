import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => ({
  title: "Enter your partner's name",
  errors: {
    applicant1BailiffPartnersName: {
      required: "You must enter your partner's name.",
    },
  },
});

const cy: typeof en = () => ({
  title: "Enter your partner's name",
  errors: {
    applicant1BailiffPartnersName: {
      required: "You must enter your partners name.",
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffPartnersName: {
      type: 'text',
      classes: 'govuk-input--width-40',
      label: l => l.title,
      labelHidden: true,
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
