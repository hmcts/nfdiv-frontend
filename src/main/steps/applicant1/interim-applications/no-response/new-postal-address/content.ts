import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../../app/form/validation';
import { isCountryUk } from '../../../../applicant1Sequence';

// export const form: FormContent = {
//   ...applicant1Form,
//   submit: applicant1Form.submit,
// };

export const form: FormContent = {
  fields: {
    newApplicant2Address1: {
      id: 'newAddress1',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.buildingStreet,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    newApplicant2Address2: {
      id: 'newAddress2',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.line2Optional,
      labelSize: null,
    },
    newApplicant2Address3: {
      id: 'newAddress3',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.line3Optional,
      labelSize: null,
    },
    newApplicant2AddressTown: {
      id: 'newAddressTown',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: (value, formData) => {
        if (!isCountryUk(formData.applicant2AddressCountry)) {
          return;
        }
        return isFieldFilledIn(value);
      },
    },
    newApplicant2AddressCounty: {
      id: 'newAddressCounty',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      labelSize: null,
    },
    newApplicant2AddressPostcode: {
      id: 'newAddressPostcode',
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      autocomplete: 'postal-code',
      label: l => l.postcode,
      labelSize: null,
      attributes: {
        maxLength: 14,
      },
      validator: (value, formData) => {
        if (!isCountryUk(formData.applicant2AddressCountry)) {
          return;
        }
        return isInvalidPostcode(value);
      },
    },
    newApplicant2AddressCountry: {
      id: 'newAddressCountry',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.country,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    newApplicant2AddressOverseas: {
      id: 'newAddressOverseas',
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

export const generateContent: TranslationFn = content => {
  return {
    //...applicant1GenerateContent(content),
    form,
  };
};
