import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = partner => ({
  title: `Enter your ${partner}'s name`,
  errors: {
    applicant1BailiffPartnersName: {
      required: `You must enter your ${partner}'s name.`,
    },
  },
});

const cy: typeof en = partner => ({
  title: `Enter your ${partner}'s name`,
  errors: {
    applicant1BailiffPartnersName: {
      required: `You must enter your ${partner}'s name.`,
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
