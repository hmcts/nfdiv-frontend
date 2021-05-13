import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../app/form/validation';

const en = () => {
  const addressPostcode = {
    required: 'You have not entered your postcode. Enter your postcode before continuing.',
    invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
    notSelected: 'You have not selected your address. Select your address from the list before continuing.',
  };

  return {
    title: 'Enter your postal address',
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
      addressPostcode,
      yourAddressPostcode: addressPostcode,
      yourAddressCountry: {
        required: 'You have not entered your country. Enter your country before continuing.',
      },
    },
  };
};

const cy = () => {
  const addressPostcode = {
    required: 'Nid ydych wedi rhoi cod post. Rhowch god post cyn parhau.',
    invalid: 'Nid ydych wedi rhoi cod post yn y DU dilys. Rhowch god post yn y DU dilys cyn parhau.',
    notSelected: 'Nid ydych wedi rhoi eich cyfeiriad. Rhowch eich cyfeiriad cyn parhau.',
  };

  return {
    // @TODO translations for optional internation fields
    ...en(),
    title: 'Nodwch eich cyfeiriad post',
    enterPostcode: 'Nodwch god post yn y DU',
    buildingStreet: "Rhif neu enw'r adeilad, Stryd",
    town: 'Tref neu ddinas',
    county: 'Sir',
    postcode: 'Cod post',
    findAddress: 'Dod o hyd i gyfeiriad',
    notUK: 'Ni allaf nodi cod post yn y DU',
    enterUkPostcode: 'Nodwch god post yn y DU',
    selectAddress: 'Dewiswch gyfeiriad',
    addressesFound: (addressesFound: number) =>
      `Daethpwyd o hyd i ${addressesFound} ${addressesFound !== 1 ? 'gyfeiriad' : 'cyfeiriad'}`,
    cannotFindAddress: "Ni allaf ddod o hyd i'r cyfeiriad yn y rhestr",
    errors: {
      yourAddress1: {
        required: "Nid ydych wedi rhoi rhif neu enw'r adeilad",
      },
      yourAddressTown: {
        required: 'Nid ydych wedi rhoi eich cyfeiriad. Rhowch eich cyfeiriad cyn parhau.',
      },
      addressPostcode,
      yourAddressPostcode: addressPostcode,
    },
  };
};

const uk = 'UK';
export const form: FormContent = {
  fields: {
    yourAddress1: {
      id: 'address1',
      type: 'text',
      classes: 'govuk-label',
      hidden: true,
      label: l => l.buildingStreet,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    yourAddress2: {
      id: 'address2',
      type: 'text',
      classes: 'govuk-label',
      hidden: true,
      label: l => l.line2Optional,
      labelSize: null,
    },
    yourAddress3: {
      id: 'address3',
      type: 'text',
      classes: 'govuk-label',
      hidden: true,
      label: l => l.line3Optional,
      labelSize: null,
    },
    yourAddressTown: {
      id: 'addressTown',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      hidden: true,
      label: l => l.town,
      labelSize: null,
      validator: (value, formData) => {
        if (formData.yourAddressCountry !== uk) {
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
      attributes: {
        maxLength: 14,
      },
      validator: (value, formData) => {
        if (formData.yourAddressCountry !== uk) {
          return;
        }
        return isInvalidPostcode(value);
      },
    },
    yourAddressCountry: {
      id: 'addressCountry',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      hidden: true,
      label: l => l.country,
      labelSize: null,
      validator: isFieldFilledIn,
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
