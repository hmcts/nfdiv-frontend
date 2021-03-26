import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

const en = {
  title: 'Enter your postal address',
  yourFullAddress: 'Full address',
  enterUkPostcode: 'Enter UK postcode',
  errors: {
    yourFullAddress: {
      required: 'You have not entered your full address. Enter your full address before continuing.',
    },
  },
};

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    yourFullAddress: {
      type: 'textarea',
      classes: 'govuk-label',
      label: l => l.yourFullAddress,
      labelSize: null,
      attributes: { rows: 8 },
      validator: isFieldFilledIn,
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
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
