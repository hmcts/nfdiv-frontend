import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { hasValueChanged, isFieldFilledIn, isInvalidPostcode } from '../../../../../app/form/validation';
import { isCountryUk } from '../../../../applicant1Sequence';
import { CommonContent } from '../../../../common/common.content';
import { getAddressFieldNames } from '../../../../common/content.utils';
import { generateContent as enterTheirAddressContent } from '../../../enter-their-address/content';

const en = ({ partner }: Partial<CommonContent>) => {
  const addressPostcode = {
    required: `You have not entered your ${partner}’s postcode. Enter their postcode before continuing.`,
    invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
    notSelected: `You have not selected your ${partner}’s address. Select their address from the list before continuing.`,
  };

  return {
    errors: {
      applicant1NoResponsePartnerAddress1: {
        valueUnchanged: `You have entered the same address as the one you previously provided for your ${partner}. Please enter a new address to continue.`,
        required: `You have not entered your ${partner}’s building and street address. Enter their building and street address before continuing.`,
      },
      applicant1NoResponsePartnerAddressTown: {
        required: `You have not entered your ${partner}’s town or city. Enter their town or city before continuing.`,
      },
      addressPostcode,
      applicant1NoResponsePartnerAddressPostcode: addressPostcode,
      applicant1NoResponsePartnerAddressCountry: {
        required: `You have not entered your ${partner}’s country. Enter their country before continuing.`,
        valueUnchanged: 'You have entered the same address as before. You must change the address to continue.',
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
      applicant1NoResponsePartnerAddress1: {
        valueUnchanged: `You have entered the same address as the one you previously provided for your ${partner}. Please enter a new address to continue.`,
        required: `Nid ydych wedi nodi adeilad a chyfeiriad stryd eich ${partner}. Nodwch ei adeilad a'i gyfeiriad stryd cyn parhau.`,
      },
      applicant1NoResponsePartnerAddressTown: {
        required: `Nid ydych wedi nodi tref neu ddinas eich ${partner}. Nodwch ei dref neu ddinas cyn parhau.`,
      },
      addressPostcode,
      applicant1NoResponsePartnerAddressPostcode: addressPostcode,
      applicant1NoResponsePartnerAddressCountry: {
        required: `Nid ydych wedi nodi gwlad eich ${partner}. Nodwch ei wlad cyn parhau.`,
      },
    },
  };
};

const addressHasChangedValidator = (userCase, formData) => {
  const beforeAddress = getAddressFieldNames('applicant2')
    .map(field => userCase?.[field])
    .filter(value => value !== undefined);

  const afterAddress = getAddressFieldNames('applicant1NoResponsePartner')
    .map(field => formData?.[field])
    .filter(value => value !== undefined);

  return hasValueChanged(beforeAddress, afterAddress);
};

export const form: FormContent = {
  fields: userCase => ({
    applicant1NoResponsePartnerAddress1: {
      id: 'address1',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.buildingStreet,
      labelSize: null,
      validator: (value, formData) => {
        if (!isCountryUk(formData.applicant1NoResponsePartnerAddressCountry)) {
          return;
        }
        return isFieldFilledIn(value) || addressHasChangedValidator(userCase, formData);
      },
    },
    applicant1NoResponsePartnerAddress2: {
      id: 'address2',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.line2Optional,
      labelSize: null,
    },
    applicant1NoResponsePartnerAddress3: {
      id: 'address3',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.line3Optional,
      labelSize: null,
    },
    applicant1NoResponsePartnerAddressTown: {
      id: 'addressTown',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: (value, formData) => {
        if (!isCountryUk(formData.applicant1NoResponsePartnerAddressCountry)) {
          return;
        }
        return isFieldFilledIn(value);
      },
    },
    applicant1NoResponsePartnerAddressCounty: {
      id: 'addressCounty',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      labelSize: null,
    },
    applicant1NoResponsePartnerAddressPostcode: {
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
        if (!isCountryUk(formData.applicant1NoResponsePartnerAddressCountry)) {
          return;
        }
        return isInvalidPostcode(value);
      },
    },
    applicant1NoResponsePartnerAddressCountry: {
      id: 'addressCountry',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.country,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant1NoResponsePartnerAddressOverseas: {
      id: 'addressOverseas',
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.addressOverseas,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
    },
  }),
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
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}, content.language) },
  };
};
