import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../../app/form/validation';
import { isCountryUk } from '../../../../applicant1Sequence';
import { CommonContent } from '../../../../common/common.content';
import { generateContent as enterTheirAddressContent } from '../../../enter-their-address/content';

const en = ({ partner }: Partial<CommonContent>) => {
  const addressPostcode = {
    required: `You have not entered your ${partner}’s postcode. Enter their postcode before continuing.`,
    invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
    notSelected: `You have not selected your ${partner}’s address. Select their address from the list before continuing.`,
  };

  return {
    errors: {
      applicant1NoRespAddressAddress1: {
        required: `You have not entered your ${partner}’s building and street address. Enter their building and street address before continuing.`,
        valueUnchanged: `You have entered the same postal address as the one you previously provided for your ${partner}. Please enter a new address to continue.`,
      },
      applicant1NoRespAddressAddressTown: {
        required: `You have not entered your ${partner}’s town or city. Enter their town or city before continuing.`,
      },
      addressPostcode,
      applicant1NoRespAddressAddressPostcode: addressPostcode,
      applicant1NoRespAddressAddressCountry: {
        required: `You have not entered your ${partner}’s country. Enter their country before continuing.`,
      },
    },
  };
};

const cy = ({ partner }: CommonContent) => {
  const addressPostcode = {
    required: `Nid ydych wedi nodi cod post eich ${partner}. Nodwch ei god post cyn parhau.`,
    invalid: 'Nid ydych wedi nodi cod post DU dilys. Nodwch god post DU dilys cyn parhau.',
    notSelected: `Nid ydych wedi dewis cyfeiriad eich ${partner}. Dewiswch eu cyfeiriad o'r rhestr cyn parhau.`,
  };

  return {
    errors: {
      applicant1NoRespAddressAddress1: {
        required: `Nid ydych wedi nodi adeilad a chyfeiriad stryd eich ${partner}. Nodwch ei adeilad a'i gyfeiriad stryd cyn parhau.`,
        valueUnchanged: `Rydych wedi nodi'r un cyfeiriad post â'r un a ddarparwyd o'r blaen ar gyfer eich ${partner}. Rhowch gyfeiriad newydd i barhau.`,
      },
      applicant1NoRespAddressAddressTown: {
        required: `Nid ydych wedi nodi tref neu ddinas eich ${partner}. Nodwch ei dref neu ddinas cyn parhau.`,
      },
      addressPostcode,
      applicant1NoRespAddressAddressPostcode: addressPostcode,
      applicant1NoRespAddressAddressCountry: {
        required: `Nid ydych wedi nodi gwlad eich ${partner}. Nodwch ei wlad cyn parhau.`,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1NoRespAddressAddress1: {
      id: 'address1',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.buildingStreet,
      labelSize: null,
      validator: value => {
        return isFieldFilledIn(value);
      },
    },
    applicant1NoRespAddressAddress2: {
      id: 'address2',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.line2Optional,
      labelSize: null,
    },
    applicant1NoRespAddressAddress3: {
      id: 'address3',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.line3Optional,
      labelSize: null,
    },
    applicant1NoRespAddressAddressTown: {
      id: 'addressTown',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: (value, formData) => {
        if (!isCountryUk(formData.applicant1NoRespAddressAddressCountry)) {
          return;
        }
        return isFieldFilledIn(value);
      },
    },
    applicant1NoRespAddressAddressCounty: {
      id: 'addressCounty',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      labelSize: null,
    },
    applicant1NoRespAddressAddressPostcode: {
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
        if (!isCountryUk(formData.applicant1NoRespAddressAddressCountry)) {
          return;
        }
        return isInvalidPostcode(value);
      },
    },
    applicant1NoRespAddressAddressCountry: {
      id: 'addressCountry',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.country,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant1NoRespAddressAddressOverseas: {
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
    ...enterTheirAddressContent(content),
    ...translations,
    form,
  };
};
