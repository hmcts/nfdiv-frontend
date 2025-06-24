import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `What hair colour does your ${partner} have?`,
  errors: {
    applicant1BailiffPartnersHairColour: {
      required: `Please enter your ${partner}'s hair colour.`,
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `What hair colour does your ${partner} have?`,
  errors: {
    applicant1BailiffPartnersHairColour: {
      required: `Please enter your ${partner}'s hair colour.`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffPartnersHairColour: {
      type: 'text',
      label: l => l.title,
      labelHidden: true,
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
