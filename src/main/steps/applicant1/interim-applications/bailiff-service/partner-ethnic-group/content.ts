import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => ({
  title: "What is your partner's ethnic group?",
  hint: 'For example, Bangladeshi',
  errors: {
    applicant1BailiffPartnersEthnicGroup: {
      required: "Please enter your partner's ethnic group.",
    },
  },
});

const cy: typeof en = () => ({
  title: "What is your partner's ethnic group?",
  hint: 'For example, Bangladeshi',
  errors: {
    applicant1BailiffPartnersEthnicGroup: {
      required: "Please enter your partner's ethnic group.",
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffPartnersEthnicGroup: {
      type: 'textarea',
      label: l => l.title,
      labelHidden: true,
      hint: l => l.hint,
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
