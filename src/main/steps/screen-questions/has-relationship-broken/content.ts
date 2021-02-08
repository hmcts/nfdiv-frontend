import { FormBody, FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

export const getContent = (title: string): Record<string, unknown> => {
  const en = {
    divorce: {
      title,
      line1:
        'Your marriage must have irretrievably broken down for you to get a divorce. This means it cannot be saved.',
      yes: 'Yes, my marriage has irretrievably broken down',
      no: 'No, my marriage has not irretrievably broken down',
      notBrokenDownSelected:
        'Your marriage must have irretrievably broken down for you to get a divorce. This is the law in England and Wales.',
      errors: {
        screenHasUnionBroken: {
          required: 'Please confirm if your marriage has irretrievably broken down',
        },
      },
    },
    civil: {
      title: 'Has your relationship irretrievably broken down (it cannot be saved)?',
      line1:
        'Your relationship must have irretrievably broken down for you to end your civil partnership. This means it cannot be saved.',
      yes: 'Yes, my relationship has irretrievably broken down',
      no: 'No, my relationship has not irretrievably broken down',
      notBrokenDownSelected:
        'Your relationship must have irretrievably broken down for you to end your civil partnership. This is the law in England and Wales.',
      errors: {
        screenHasUnionBroken: {
          required: 'Please confirm if your relationship has irretrievably broken down',
        },
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

export type HasMarriageBrokenForm = FormBody<typeof form>;
