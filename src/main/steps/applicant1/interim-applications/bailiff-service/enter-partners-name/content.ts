import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Enter your ${partner}'s name`,
  errors: {
    applicant1BailiffPartnersName: {
      required: `You must enter your ${partner}'s name.`,
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Rhowch enw’ch ${partner}`,
  errors: {
    applicant1BailiffPartnersName: {
      required: `Mae’n rhaid ichi nodi enw eich ${partner}.`,
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
