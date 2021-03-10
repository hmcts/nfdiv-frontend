import { Gender } from '@hmcts/nfdiv-case-definition';

import { Checkbox } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

const en = ({ isDivorce, commonTranslations }) => ({
  title: isDivorce ? 'Who are you applying to divorce?' : 'Are you male or female?',
  male: isDivorce ? 'My husband' : 'Male',
  female: isDivorce ? 'My wife' : 'Female',
  appliesToYou: 'Select the following if it applies to you:',
  sameSex: `We were a same-sex couple when we ${isDivorce ? 'got married' : 'formed our civil partnership'}`,
  errors: {
    gender: {
      required: commonTranslations.required,
    },
  },
});

// @TODO translations
const cy = ({ isDivorce, commonTranslations }) => ({
  ...en({ isDivorce, commonTranslations }),
  errors: {
    gender: {
      required: commonTranslations.required,
    },
  },
});

export const form: FormContent = {
  fields: {
    gender: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      values: [
        { label: l => l.male, value: Gender.MALE },
        { label: l => l.female, value: Gender.FEMALE },
      ],
      validator: value => isFieldFilledIn(value),
    },
    appliesToYou: {
      type: 'checkboxes',
      label: l => l.appliesToYou,
      values: [{ name: 'sameSex', label: l => l.sameSex, value: Checkbox.Checked }],
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
