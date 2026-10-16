import { TranslationFn } from '../../../../../app/controller/GetController.js';
import { FormContent } from '../../../../../app/form/Form.js';
import { isFieldFilledIn } from '../../../../../app/form/validation.js';
import type { CommonContent } from '../../../../common/common.content.js';

const en = ({ partner }: CommonContent) => ({
  title: `What is your ${partner}'s ethnic group?`,
  hint: 'For example, Bangladeshi',
  errors: {
    applicant1BailiffPartnersEthnicGroup: {
      required: `Enter your ${partner}'s ethnic group.`,
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Beth yw grŵp ethnig eich ${partner}?`,
  hint: 'Er enghraifft, Bangladeshaidd',
  errors: {
    applicant1BailiffPartnersEthnicGroup: {
      required: `Rhowch grŵp ethnig eich ${partner}`,
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
