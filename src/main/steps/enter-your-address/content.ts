import { Checkbox } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isInvalidPostcode } from '../../app/form/validation';

const en = {
  title: 'Enter your postal address',
  postcode: 'Enter a UK postcode',
  findAddress: 'Find address',
  notUK: 'I cannot enter a UK postcode',
  errors: {
    yourAddressPostcode: {
      required: 'You have not entered your address. Enter your address before continuing.',
      invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
    },
  },
};

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    yourAddressPostcode: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.postcode,
      labelSize: null,
      hideError: true,
      validator: (value, form = {}) => {
        if (form.myAddressIsInternational === Checkbox.Checked) {
          return;
        }
        return isInvalidPostcode(value);
      },
    },
    yourAddressInternational: {
      type: 'checkboxes',
      classes: 'govuk-visually-hidden',
      labelHidden: true,
      values: [
        {
          name: 'myAddressIsInternational',
          label: l => l.notUK,
          value: Checkbox.Checked,
          selected: false,
          attributes: { autocomplete: 'off' },
        },
      ],
    },
  },
  submit: {
    text: l => l.findAddress,
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
