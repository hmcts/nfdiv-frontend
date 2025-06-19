import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../../app/form/validation';
import { isCountryUk } from '../../../../applicant1Sequence';
import type { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: Partial<CommonContent>) => {
  const addressPostcode = {
    required: 'You have not entered a postcode. Enter a postcode before continuing.',
    invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
    notSelected: 'You have not selected an address. Select an address from the list before continuing.',
  };

  return {
    title: `Where did you and your ${partner} live together?`,
    enterPostcode: 'Enter a UK postcode',
    buildingStreet: 'Building and street',
    line1: 'Address line 1',
    line2Optional: 'Address line 2 (optional)',
    line3Optional: 'Address line 3 (optional)',
    town: 'Town or city',
    townOptional: 'Town or city (optional)',
    county: 'County',
    countyOptional: 'County, district, state or province (optional)',
    postcode: 'Postcode',
    postcodeOptional: 'Postal code, zip code or area code (optional)',
    country: 'Country',
    findAddress: 'Find address',
    notUK: 'I have an international address',
    enterUkPostcode: 'Enter UK postcode',
    selectAddress: 'Select an address',
    addressOverseas: 'Is this an international address?',
    addressesFound: (addressesFound: number) => `${addressesFound} address${addressesFound !== 1 ? 'es' : ''} found`,
    cannotFindAddress: 'I cannot find the address in the list',
    errors: {
      applicant2Address1: {
        required: `You have not entered a building and street address. Enter a building and street address before continuing.`,
      },
      applicant2AddressTown: {
        required: `You have not entered a town or city. Enter a town or city before continuing.`,
      },
      addressPostcode,
      applicant2AddressPostcode: addressPostcode,
      applicant2AddressCountry: {
        required: `You have not entered a country. Enter a country before continuing.`,
      },
    },
  };
};

const cy = ({ partner }: CommonContent) => {
  const addressPostcode = {
    required: 'You have not entered a postcode. Enter a postcode before continuing.',
    invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
    notSelected: 'You have not selected an address. Select an address from the list before continuing.',
  };

  return {
    title: `Where did you and your ${partner} live together?`,
    enterPostcode: 'Enter a UK postcode',
    buildingStreet: 'Building and street',
    line1: 'Address line 1',
    line2Optional: 'Address line 2 (optional)',
    line3Optional: 'Address line 3 (optional)',
    town: 'Town or city',
    townOptional: 'Town or city (optional)',
    county: 'County',
    countyOptional: 'County, district, state or province (optional)',
    postcode: 'Postcode',
    postcodeOptional: 'Postal code, zip code or area code (optional)',
    country: 'Country',
    findAddress: 'Find address',
    notUK: 'I have an international address',
    enterUkPostcode: 'Enter UK postcode',
    selectAddress: 'Select an address',
    addressOverseas: 'Is this an international address?',
    addressesFound: (addressesFound: number) => `${addressesFound} address${addressesFound !== 1 ? 'es' : ''} found`,
    cannotFindAddress: 'I cannot find the address in the list',
    errors: {
      applicant2Address1: {
        required: `You have not entered a building and street address. Enter a building and street address before continuing.`,
      },
      applicant2AddressTown: {
        required: `You have not entered a town or city. Enter a town or city before continuing.`,
      },
      addressPostcode,
      applicant2AddressPostcode: addressPostcode,
      applicant2AddressCountry: {
        required: `You have not entered a country. Enter a country before continuing.`,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1DispenseLivedTogetherAddress1: {
      id: 'address1',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.buildingStreet,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant1DispenseLivedTogetherAddress2: {
      id: 'address2',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.line2Optional,
      labelSize: null,
    },
    applicant1DispenseLivedTogetherAddress3: {
      id: 'address3',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.line3Optional,
      labelSize: null,
    },
    applicant1DispenseLivedTogetherAddressTown: {
      id: 'addressTown',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: (value, formData) => {
        if (!isCountryUk(formData.applicant1DispenseLivedTogetherAddressCountry)) {
          return;
        }
        return isFieldFilledIn(value);
      },
    },
    applicant1DispenseLivedTogetherAddressCounty: {
      id: 'addressCounty',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      labelSize: null,
    },
    applicant1DispenseLivedTogetherAddressPostcode: {
      id: 'addressPostcode',
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      autocomplete: 'postal-code',
      label: l => l.postcode,
      labelSize: null,
      attributes: {
        maxLength: 14,
      },
      validator: (value, formData) => {
        if (!isCountryUk(formData.applicant1DispenseLivedTogetherAddressCountry)) {
          return;
        }
        return isInvalidPostcode(value);
      },
    },
    applicant1DispenseLivedTogetherAddressCountry: {
      id: 'addressCountry',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.country,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant1DispenseLivedTogetherAddressOverseas: {
      id: 'addressOverseas',
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.addressOverseas,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
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
