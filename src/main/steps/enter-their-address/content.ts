import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../app/form/validation';
import type { CommonContent } from '../../steps/common/common.content';

const en = ({ partner }: Partial<CommonContent>) => ({
  title: `Enter your ${partner}’s postal address`,
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
    theirAddress1: {
      required: `You have not entered your ${partner}’s building and street address. Enter their building and street address before continuing.`,
    },
    theirAddressTown: {
      required: `You have not entered your ${partner}’s town or city. Enter their town or city before continuing.`,
    },
    theirAddressPostcode: {
      required: `You have not entered your ${partner}’s postcode. Enter their postcode before continuing.`,
      invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
      notSelected: `You have not selected your ${partner}’s address. Select their address from the list before continuing.`,
    },
    theirInternationalAddress: {
      required: `You have not entered your ${partner}’s full address. Enter their full address before continuing.`,
    },
  },
});

const cy = ({ partner }: CommonContent) => ({
  title: `Rhowch gyfeiriad post eich ${partner}`,
  enterPostcode: 'Nodwch god post yn y DU',
  street: "Rhif neu enw'r adeilad, Stryd",
  line2: '',
  town: 'Tref neu ddinas',
  county: 'Sir',
  postcode: 'Cod post',
  internationalAddress: 'Cyfeiriad llawn',
  findAddress: 'Dod o hyd i gyfeiriad',
  notUK: 'Ni allaf nodi cod post yn y DU',
  enterUkPostcode: 'Nodwch god post yn y DU',
  selectAddress: 'Dewiswch gyfeiriad',
  addressesFound: (addressesFound: number) =>
    `Daethpwyd o hyd i ${addressesFound} ${addressesFound !== 1 ? 'gyfeiriad' : 'cyfeiriad'}`,
  cannotFindAddress: "Ni allaf ddod o hyd i'r cyfeiriad yn y rhestr",
  errors: {
    theirAddress1: {
      required: "Nid ydych wedi rhoi rhif neu enw'r adeilad",
    },
    theirAddressTown: {
      required: 'Nid ydych wedi rhoi eich cyfeiriad. Rhowch eich cyfeiriad cyn parhau.',
    },
    theirAddressPostcode: {
      required: 'Nid ydych wedi rhoi cod post. Rhowch god post cyn parhau.',
      invalid: 'Nid ydych wedi rhoi cod post yn y DU dilys. Rhowch god post yn y DU dilys cyn parhau.',
      notSelected: `Nid ydych wedi rhoi cyfeiriad eich ${partner}. Rhowch cyfeiriad cyn parhau.`,
    },
    theirInternationalAddress: {
      required: `Nid ydych wedi nodi cyfeiriad eich ${partner}. Rhowch ei gyfeiriad/chyfeiriad llawn cyn parhau.`,
    },
  },
});

export const form: FormContent = {
  fields: {
    isTheirAddressInternational: {
      type: 'radios',
      hidden: true,
      values: [
        { id: 'addressIsInternational', label: l => l.yes, value: YesOrNo.YES },
        { id: 'addressNotInternational', label: l => l.no, value: YesOrNo.NO },
      ],
    },
    theirAddress1: {
      id: 'address1',
      type: 'text',
      classes: 'govuk-label',
      hidden: true,
      label: l => l.street,
      labelSize: null,
      validator: (value, formData) => {
        if (formData.isTheirAddressInternational === YesOrNo.YES) {
          return;
        }
        return isFieldFilledIn(value);
      },
    },
    theirAddress2: {
      id: 'address2',
      type: 'text',
      classes: 'govuk-label',
      hidden: true,
      label: l => l.line2,
      labelHidden: true,
    },
    theirAddressTown: {
      id: 'addressTown',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      hidden: true,
      label: l => l.town,
      labelSize: null,
      validator: (value, formData) => {
        if (formData.isTheirAddressInternational === YesOrNo.YES) {
          return;
        }
        return isFieldFilledIn(value);
      },
    },
    theirAddressCounty: {
      id: 'addressCounty',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      hidden: true,
      label: l => l.county,
      labelSize: null,
    },
    theirAddressPostcode: {
      id: 'addressPostcode',
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      hidden: true,
      label: l => l.postcode,
      labelSize: null,
      validator: (value, formData) => {
        if (formData.isTheirAddressInternational === YesOrNo.YES) {
          return;
        }
        return isInvalidPostcode(value);
      },
    },
    theirInternationalAddress: {
      id: 'internationalAddress',
      type: 'textarea',
      classes: 'govuk-label',
      hidden: true,
      hideError: true,
      label: l => l.internationalAddress,
      labelSize: null,
      attributes: { rows: 8 },
      validator: (value, formData) => {
        if (formData.isTheirAddressInternational === YesOrNo.NO) {
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
