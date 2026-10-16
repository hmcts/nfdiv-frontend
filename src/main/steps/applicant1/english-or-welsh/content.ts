import { LanguagePreference } from '../../../app/case/case.js';
import { TranslationFn } from '../../../app/controller/GetController.js';
import { FormContent } from '../../../app/form/Form.js';
import { isFieldFilledIn } from '../../../app/form/validation.js';
import { englishOrWelsh_cy, englishOrWelsh_en } from '../../common/common.content.js';
import { InputLabelsByLanguage } from '../../common/input-labels.content.js';

const en = ({ required }) => ({
  title: 'What language do you want to receive emails and documents in?',
  errors: {
    applicant1EnglishOrWelsh: {
      required,
    },
  },
});

const cy = () => ({
  title: 'Ym mha iaith hoffech chi gael negeseuon e-bost a dogfennau?',
  errors: {
    applicant1EnglishOrWelsh: {
      required: 'Nid ydych wedi ateb y cwestiwn. Mae angen ichi ddewis ateb cyn parhau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1EnglishOrWelsh: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l[LanguagePreference.English], value: LanguagePreference.English },
        { label: l => l[LanguagePreference.Welsh], value: LanguagePreference.Welsh },
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

export const radioButtonAnswers: InputLabelsByLanguage<LanguagePreference> = {
  en: {
    [LanguagePreference.English]: englishOrWelsh_en.english,
    [LanguagePreference.Welsh]: englishOrWelsh_en.welsh,
  },
  cy: {
    [LanguagePreference.English]: englishOrWelsh_cy.english,
    [LanguagePreference.Welsh]: englishOrWelsh_cy.welsh,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  const radioAnswers = radioButtonAnswers[content.language];
  return {
    ...translations,
    ...radioAnswers,
    form,
  };
};
