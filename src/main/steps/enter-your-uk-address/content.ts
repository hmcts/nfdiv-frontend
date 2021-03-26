import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../app/form/validation';

const en = {
  title: 'Enter your postal address',
  street: 'Building and street',
  line2: 'Second line of address',
  town: 'Town or city',
  county: 'County',
  postcode: 'Postcode',
  errors: {
    yourAddress1: {
      required:
        'You have not entered your building and street address. Enter your building and street address before continuing.',
    },
    yourAddressTown: {
      required: 'You have not entered your town or city. Enter your town or city before continuing.',
    },
    yourAddressPostcode: {
      required: 'You have not entered your postcode. Enter your postcode before continuing.',
      invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
    },
  },
};

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    yourAddress1: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.street,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    yourAddress2: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.line2,
      labelHidden: true,
    },
    yourAddressTown: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    yourAddressCounty: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      labelSize: null,
    },
    yourAddressPostcode: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.postcode,
      labelSize: null,
      validator: isInvalidPostcode,
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
