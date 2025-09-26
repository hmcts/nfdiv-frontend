import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../../app/form/validation';
import { isCountryUk } from '../../../../applicant1Sequence';
import type { CommonContent } from '../../../../common/common.content';

const addressPostcode = {
  required: 'You have not entered a postcode. Enter a postcode before continuing.',
  invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
  notSelected: 'You have not selected an address. Select an address from the list before continuing.',
};

const en = ({ partner }: Partial<CommonContent>) => ({
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
  notUK: "I've forgotten the postcode or we lived at an international address",
  enterUkPostcode: 'Enter UK postcode',
  selectAddress: 'Select an address',
  addressOverseas: 'Is this an international address?',
  yes: 'Yes',
  no: 'No',
  addressesFound: (addressesFound: number) => `${addressesFound} address${addressesFound !== 1 ? 'es' : ''} found`,
  cannotFindAddress: 'I cannot find the address in the list',
  errors: {
    applicant1DispenseLivedTogetherAddress1: {
      required:
        'You have not entered a building and street address. Enter a building and street address before continuing.',
    },
    applicant1DispenseLivedTogetherAddressTown: {
      required: 'You have not entered a town or city. Enter a town or city before continuing.',
    },
    addressPostcode,
    applicant1DispenseLivedTogetherAddressPostcode: addressPostcode,
    applicant1DispenseLivedTogetherAddressCountry: {
      required: 'You have not entered a country. Enter a country before continuing.',
    },
  },
});

const addressPostcodeCY = {
  required: 'Nid ydych wedi nodi cod post. Rhowch god post cyn parhau.',
  invalid: 'Nid ydych wedi nodi cod post dilys yn y DU. Nodwch god post dilys yn y DU cyn parhau.',
  notSelected: "Nid ydych wedi dewis cyfeiriad. Dewiswch gyfeiriad o'r rhestr cyn parhau.",
};

const cy = ({ partner }: CommonContent) => ({
  title: `Ble wnaethoch chi a’ch ${partner} fyw gyda’ch gilydd ddiwethaf?`,
  enterPostcode: 'Nodwch god post yn y DU',
  buildingStreet: 'Adeilad a stryd',
  line1: 'Llinell 1 y cyfeiriad',
  line2Optional: 'Llinell 2 y cyfeiriad (dewisol)',
  line3Optional: 'Llinell 3 y cyfeiriad (dewisol)',
  town: 'Tref neu ddinas',
  townOptional: 'Tref neu ddinas (dewisol)',
  county: 'Sir',
  countyOptional: 'Sir, ardal, gwladwriaeth neu dalaith (dewisol)',
  postcode: 'Cod post',
  postcodeOptional: 'Cod post, cod zip neu god ardal (dewisol)',
  country: 'Gwlad',
  findAddress: 'Dod o hyd i gyfeiriad',
  notUK: 'Rwyf wedi anghofio’r cod post neu gwnaethom fyw mewn cyfeiriad rhyngwladol',
  enterUkPostcode: 'Nodwch god post yn y DU',
  selectAddress: 'Dewiswch gyfeiriad',
  addressOverseas: 'A yw hwn yn gyfeiriad rhyngwladol?',
  yes: 'Ydy',
  no: 'Nac ydy',
  addressesFound: (addressesFound: number) =>
    `Wedi canfod ${addressesFound} ${addressesFound !== 1 ? 'gyfeiriad' : 'cyfeiriad'}`,
  cannotFindAddress: "Ni allaf ddod o hyd i'r cyfeiriad yn y rhestr",
  errors: {
    applicant1DispenseLivedTogetherAddress1: {
      required: 'Nid ydych wedi rhoi cyfeiriad adeilad a stryd.  Rhowch gyfeiriad adeilad a stryd cyn parhau.',
    },
    applicant1DispenseLivedTogetherAddressTown: {
      required: 'Nid ydych wedi rhoi tref neu ddinas. Rhowch enw tref neu ddinas cyn parhau.',
    },
    addressPostcode: addressPostcodeCY,
    applicant1DispenseLivedTogetherAddressPostcode: addressPostcodeCY,
    applicant1DispenseLivedTogetherAddressCountry: {
      required: 'Nid ydych wedi rhoi gwlad. Rhowch wlad cyn parhau.',
    },
  },
});

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
