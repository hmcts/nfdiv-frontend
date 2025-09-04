import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../../app/form/validation';
import { isCountryUk } from '../../../../applicant1Sequence';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: Partial<CommonContent>) => {
  const addressPostcode = {
    required: 'Enter a postcode.',
    invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
    notSelected: `You have not selected your ${partner}’s address. Select their address from the list before continuing.`,
  };

  return {
    title: `What is your ${partner}'s last known address?`,
    partnerAddressHint: `If you’re able to provide your ${partner}’s last known address it may help with the search`,
    partnerDateAtAddresses: 'Enter the dates they lived there',
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
    postcodeOptional: 'Postal code, zip code or area code',
    country: 'Country',
    findAddress: 'Find address',
    enterUkPostcode: 'Enter UK postcode',
    selectAddress: 'Select an address',
    addressesFound: (addressesFound: number) => `${addressesFound} address${addressesFound !== 1 ? 'es' : ''} found`,
    cannotFindAddress: 'I cannot find the address in the list',
    errors: {
      applicant1SearchGovRecordsPartnerLastKnownAddress1: {
        required: `You have not entered your ${partner}’s building and street address. Enter their building and street address before continuing.`,
      },
      applicant1SearchGovRecordsPartnerLastKnownAddressTown: {
        required: `You have not entered your ${partner}’s town or city. Enter their town or city before continuing.`,
      },
      addressPostcode,
      applicant1SearchGovRecordsPartnerLastKnownAddressPostcode: addressPostcode,
      applicant1SearchGovRecordsPartnerLastKnownAddressCountry: {
        required: `You have not entered your ${partner}’s country. Enter their country before continuing.`,
      },
      applicant1SearchGovRecordsPartnerLastKnownAddressDates: {
        required: `Enter the dates your ${partner} lived at this address. Enter it before continuing.`,
      },
    },
  };
};

// @TODO translations should be verified
const cy: typeof en = ({ partner }: Partial<CommonContent>) => {
  const addressPostcode = {
    required: `You have not entered your ${partner}’s postcode. Enter their postcode before continuing.`,
    invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
    notSelected: `You have not selected your ${partner}’s address. Select their address from the list before continuing.`,
  };

  return {
    title: `What is your ${partner}'s last known address?`,
    partnerAddressHint: `If you’re able to provide your ${partner}’s last known address it may help with the search`,
    partnerDateAtAddresses: 'Enter the dates they lived there',
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
    postcodeOptional: 'Postal code, zip code or area code',
    country: 'Country',
    findAddress: 'Find address',
    enterUkPostcode: 'Enter UK postcode',
    selectAddress: 'Select an address',
    addressesFound: (addressesFound: number) => `${addressesFound} address${addressesFound !== 1 ? 'es' : ''} found`,
    cannotFindAddress: 'I cannot find the address in the list',
    errors: {
      applicant1SearchGovRecordsPartnerLastKnownAddress1: {
        required: `You have not entered your ${partner}’s building and street address. Enter their building and street address before continuing.`,
      },
      applicant1SearchGovRecordsPartnerLastKnownAddressTown: {
        required: `You have not entered your ${partner}’s town or city. Enter their town or city before continuing.`,
      },
      addressPostcode,
      applicant1SearchGovRecordsPartnerLastKnownAddressPostcode: addressPostcode,
      applicant1SearchGovRecordsPartnerLastKnownAddressCountry: {
        required: `You have not entered your ${partner}’s country. Enter their country before continuing.`,
      },
      applicant1SearchGovRecordsPartnerLastKnownAddressDates: {
        required: `Enter the dates your ${partner} lived at this address. Enter it before continuing.`,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1SearchGovRecordsPartnerLastKnownAddress1: {
      id: 'address1',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.buildingStreet,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant1SearchGovRecordsPartnerLastKnownAddress2: {
      id: 'address2',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.line2Optional,
      labelSize: null,
    },
    applicant1SearchGovRecordsPartnerLastKnownAddress3: {
      id: 'address3',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.line3Optional,
      labelSize: null,
    },
    applicant1SearchGovRecordsPartnerLastKnownAddressTown: {
      id: 'addressTown',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: (value, formData) => {
        if (!isCountryUk(formData.applicant1SearchGovRecordsPartnerLastKnownAddressCountry)) {
          return;
        }

        return isFieldFilledIn(value);
      },
    },
    applicant1SearchGovRecordsPartnerLastKnownAddressCounty: {
      id: 'addressCounty',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      labelSize: null,
    },
    applicant1SearchGovRecordsPartnerLastKnownAddressPostcode: {
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
        const country = formData.applicant1SearchGovRecordsPartnerLastKnownAddressCountry;

        if (country && !isCountryUk(country)) {
          return;
        }

        return isInvalidPostcode(value);
      },
    },
    applicant1SearchGovRecordsPartnerLastKnownAddressCountry: {
      id: 'addressCountry',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.country,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant1SearchGovRecordsPartnerLastKnownAddressOverseas: {
      id: 'addressOverseas',
      type: 'hidden',
      classes: 'govuk-visually--hidden',
      label: l => l.null,
      value: YesOrNo.NO,
    },
    applicant1SearchGovRecordsPartnerLastKnownAddressDates: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.partnerDateAtAddresses,
      labelSize: 'normal',
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
  const translations = languages[content.language](content);
  return {
    form,
    ...translations,
  };
};
