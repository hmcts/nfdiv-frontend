import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => ({
  title: 'How tall is your partner?',
  enterHeightHint: 'For example, 185cm or 6\'1"',
  errors: {
    applicant1BailiffPartnersHeight: {
      required: "Please enter your partner's height.",
    },
  },
});

const cy: typeof en = () => ({
  title: 'How tall is your partner?',
  enterHeightHint: 'For example, 185cm or 6\'1"',
  errors: {
    applicant1BailiffPartnersHeight: {
      required: "Please enter your partner's height.",
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffPartnersHeight: {
      type: 'text',
      label: l => l.enterHeight,
      labelHidden: true,
      hint: l => l.enterHeightHint,
      labelSize: null,
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
