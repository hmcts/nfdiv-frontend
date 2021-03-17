import { LanguagePreference } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

const en = ({ required }) => ({
  title: 'What language do you want to receive emails and documents in? ',
  errors: {
    englishOrWelsh: {
      required,
    },
  },
});

const cy: typeof en = ({ required }) => ({ ...en({ required }) });

export const form: FormContent = {
  fields: {
    englishOrWelsh: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.english, value: LanguagePreference.English },
        { label: l => l.welsh, value: LanguagePreference.Welsh },
      ],
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
