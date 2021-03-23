import { YesOrNo } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

const en = ({ required }) => ({
  title: 'Changes to your name',
  line1: 'The court needs to know if you have changed your name.',
  lastNameChangeWhenMarried: 'Did you change your last name when you got married?',
  lastNameChangeWhenMarriedHint: 'For example, from a maiden name',
  anyNameChangeSinceMarriage: 'Have you changed any part of your name since getting married?',
  anyNameChangeSinceMarriageHint: 'For example, by deed poll',
  errors: {
    lastNameChangeWhenMarried: { required },
    anyNameChangeSinceMarriage: { required },
  },
});

const cy: typeof en = ({ required }) => ({
  ...en({ required }),
});

export const form: FormContent = {
  fields: {
    lastNameChangeWhenMarried: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.lastNameChangeWhenMarried,
      hint: l => l.lastNameChangeWhenMarriedHint,
      values: [
        { label: l => l.yes, value: YesOrNo.Yes },
        { label: l => l.no, value: YesOrNo.No },
      ],
      validator: value => isFieldFilledIn(value),
    },
    anyNameChangeSinceMarriage: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.anyNameChangeSinceMarriage,
      hint: l => l.anyNameChangeSinceMarriageHint,
      values: [
        { label: l => l.yes, value: YesOrNo.Yes },
        { label: l => l.no, value: YesOrNo.No },
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
