import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

export const generateContent = (title: string): TranslationFn => ({ isDivorce }) => {
  const en = {
    title: isDivorce ? title : 'Are you male or female?',
    masculine: isDivorce ? 'My husband' : 'Male',
    feminine: isDivorce ? 'My wife' : 'Female',
    sameSex: 'Select the following if it applies to you:',
    sameSexOption: `We were a same-sex couple when we ${isDivorce ? 'got married' : 'formed our civil partnership'}`,
    errors: {
      partnerGender: {
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
    partnerGender: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      values: [
        { label: l => l.masculine, value: 'Masculine' },
        { label: l => l.feminine, value: 'Feminine' },
      ],
      validator: value => isFieldFilledIn(value),
    },
    sameSex: {
      type: 'checkboxes',
      label: l => l.sameSex,
      values: [{ label: l => l.sameSexOption, value: 'Same-sex couple' }],
    },
  },
  submit: {
    text: l => l.continue,
  },
};
