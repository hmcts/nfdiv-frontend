import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `How tall is your ${partner}?`,
  enterHeightHint: 'For example, 185cm or 6\'1"',
  errors: {
    applicant1BailiffPartnersHeight: {
      required: `Enter your ${partner}'s approximate height`,
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Pa mor dal yw eich ${partner}?`,
  enterHeightHint: 'Er enghraifft, 185cm neu 6\'1"',
  errors: {
    applicant1BailiffPartnersHeight: {
      required: `Rhowch daldra eich ${partner} yn fras`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffPartnersHeight: {
      type: 'text',
      label: l => l.title,
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
