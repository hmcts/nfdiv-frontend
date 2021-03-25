import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

const en = {
  title: 'Enter your postal address',
  selectAddress: 'Select an address',
  addressesFound: (addressesFound: number) => `${addressesFound} address${addressesFound !== 1 ? 'es' : ''} found`,
  cannotFindAddress: 'I cannot find the address in the list',
  postcode: 'Postcode',
  errors: {
    yourAddress1: {
      required: 'You have not selected your address. Select your address from the dropdown before continuing.',
    },
  },
};

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    yourAddress1: {
      type: 'text',
      label: '',
      validator: isFieldFilledIn,
    },
    yourAddress2: {
      type: 'text',
      label: '',
    },
    yourAddressTown: {
      type: 'text',
      label: '',
    },
    yourAddressCounty: {
      type: 'text',
      label: '',
    },
    yourAddressPostcode: {
      type: 'text',
      label: '',
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
