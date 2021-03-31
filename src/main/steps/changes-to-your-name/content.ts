import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

const en = ({ isDivorce, required }) => ({
  title: 'Changes to your name',
  line1: 'The court needs to know if you have changed your name.',
  lastNameChangeWhenRelationshipFormed: `Did you change your last name when you ${
    isDivorce ? 'got married' : 'formed your civil partnership'
  }?`,
  lastNameChangeWhenRelationshipFormedHint: 'For example, from a maiden name',
  anyNameChangeSinceRelationshipFormed: `Have you changed any part of your name since ${
    isDivorce ? 'getting married' : 'forming your civil partnership'
  }?`,
  anyNameChangeSinceRelationshipFormedHint: 'For example, by deed poll',
  errors: {
    lastNameChangeWhenRelationshipFormed: { required },
    anyNameChangeSinceRelationshipFormed: { required },
  },
});

//TODO translation
const cy = en;

export const form: FormContent = {
  fields: {
    lastNameChangeWhenRelationshipFormed: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.lastNameChangeWhenRelationshipFormed,
      hint: l => l.lastNameChangeWhenRelationshipFormedHint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
    anyNameChangeSinceRelationshipFormed: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.anyNameChangeSinceRelationshipFormed,
      hint: l => l.anyNameChangeSinceRelationshipFormedHint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
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
