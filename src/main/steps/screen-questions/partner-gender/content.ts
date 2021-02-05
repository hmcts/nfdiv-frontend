import { FormBody, FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

export const getContent = (title: string): Record<string, unknown> => {
  const en = {
    divorce: {
      title,
      masculine: 'My husband',
      feminine: 'My wife',
      sameSex: 'Select the following if it applies to you:',
      sameSexOption: 'We were a same-sex couple when we got married',
      errors: {
        partnerGender: {
          required: 'Please confirm if your are devoicing your husband or wife',
        },
      },
    },
    civil: {
      title: 'Are you male or female?',
      masculine: 'Male',
      feminine: 'Female',
      sameSex: 'Select the following if it applies to you:',
      sameSexOption: 'We were a same-sex couple when we formed our civil partnership',
      errors: {
        partnerGender: {
          required: 'Please confirm your gender',
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

  return {
    en,
    cy,
    common,
  };
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

export type PartnerGenderForm = FormBody<typeof form>;
