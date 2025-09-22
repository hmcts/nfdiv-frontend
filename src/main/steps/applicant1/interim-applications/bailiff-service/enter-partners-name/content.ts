import capitalize from 'lodash/capitalize';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Enter your ${partner}'s name`,
  errors: {
    applicant1BailiffPartnersName: {
      required: `${capitalize(partner)}’s name cannot be blank.`,
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: `Rhowch enw’ch ${partner}`,
  errors: {
    applicant1BailiffPartnersName: {
      required: `Ni all enw’r ${partner} gael ei adael yn wag.`,
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
