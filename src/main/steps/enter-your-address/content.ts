import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../app/form/validation';

const en = {
  title: 'Enter your postal address',
  enterPostcode: 'Enter a UK postcode',
  street: 'Building and street',
  line2: 'Second line of address',
  town: 'Town or city',
  county: 'County',
  postcode: 'Postcode',
  internationalAddress: 'Full address',
  findAddress: 'Find address',
  notUK: 'I cannot enter a UK postcode',
  enterUkPostcode: 'Enter UK postcode',
  selectAddress: 'Select an address',
  addressesFound: (addressesFound: number) => `${addressesFound} address${addressesFound !== 1 ? 'es' : ''} found`,
  cannotFindAddress: 'I cannot find the address in the list',
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
      notSelected: 'You have not selected your address. Select your address from the list before continuing.',
    },
    yourInternationalAddress: {
      required: 'You have not entered your full address. Enter your full address before continuing.',
    },
  },
};

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    isInternationalAddress: {
      type: 'radios',
      hidden: true,
      values: [
        { id: 'isInternationalAddress', label: l => l.yes, value: YesOrNo.YES },
        { id: 'notInternationalAddress', label: l => l.no, value: YesOrNo.NO },
      ],
    },
    yourAddress1: {
      id: 'address1',
      type: 'text',
      classes: 'govuk-label',
      hidden: true,
      label: l => l.street,
      labelSize: null,
      validator: (value, formData) => {
        if (formData.isInternationalAddress === YesOrNo.YES) {
          return;
        }
        return isFieldFilledIn(value);
      },
    },
    yourAddress2: {
      id: 'address2',
      type: 'text',
      classes: 'govuk-label',
      hidden: true,
      label: l => l.line2,
      labelHidden: true,
    },
    yourAddressTown: {
      id: 'addressTown',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      hidden: true,
      label: l => l.town,
      labelSize: null,
      validator: (value, formData) => {
        if (formData.isInternationalAddress === YesOrNo.YES) {
          return;
        }
        return isFieldFilledIn(value);
      },
    },
    yourAddressCounty: {
      id: 'addressCounty',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      hidden: true,
      label: l => l.county,
      labelSize: null,
    },
    yourAddressPostcode: {
      id: 'addressPostcode',
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      hidden: true,
      label: l => l.postcode,
      labelSize: null,
      validator: (value, formData) => {
        if (formData.isInternationalAddress === YesOrNo.YES) {
          return;
        }
        return isInvalidPostcode(value);
      },
    },
    yourInternationalAddress: {
      id: 'internationalAddress',
      type: 'textarea',
      classes: 'govuk-label',
      hidden: true,
      hideError: true,
      label: l => l.internationalAddress,
      labelSize: null,
      attributes: { rows: 8 },
      validator: (value, formData) => {
        if (formData.isInternationalAddress === YesOrNo.NO) {
          return;
        }
        return isFieldFilledIn(value);
      },
    },
  },
  submit: {
    text: l => l.continue,
    classes: 'govuk-visually-hidden',
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
