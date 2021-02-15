import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

export const generateContent = (title: string): TranslationFn => ({ isDivorce }) => {
  const en = {
    title: isDivorce ? title : 'Has your relationship irretrievably broken down (it cannot be saved)?',
    line1: `Your ${isDivorce ? 'marriage' : 'relationship'} must have irretrievably broken down for you to
      ${isDivorce ? 'get a divorce' : 'end your civil partnership'}. This means it cannot be saved.`,
    yes: `Yes, my ${isDivorce ? 'marriage' : 'relationship'} has irretrievably broken down`,
    no: `No, my ${isDivorce ? 'marriage' : 'relationship'} has not irretrievably broken down`,
    notBrokenDownSelected: `Your ${isDivorce ? 'marriage' : 'relationship'}
      must have irretrievably broken down for you to ${isDivorce ? 'get a divorce' : 'end your civil partnership'}.
      This is the law in England and Wales.`,
    errors: {
      screenHasUnionBroken: {
        required: 'You have not answered the question. You need to select an answer before continuing.',
      },
    },
  };

  // @TODO translations
  const cy: typeof en = {
    ...en,
  };

  const common = {
    form,
  };

  return { en, cy, common };
};

export const form: FormContent = {
  fields: {
    screenHasUnionBroken: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      values: [
        { label: l => l.yes, value: 'Yes' },
        {
          label: l => l.no,
          value: 'No',
          warning: l => l.notBrokenDownSelected,
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};
