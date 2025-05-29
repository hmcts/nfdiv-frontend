import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../../../applicant1/enter-their-address/content';

export const form: FormContent = {
  ...applicant1Form,
  submit: applicant1Form.submit,
};
// export const form: FormContent = {
//   fields: {
//     applicant2Address1: {
//       id: 'address1',
//       type: 'text',
//       classes: 'govuk-label',
//       label: l => l.buildingStreet,
//       labelSize: null,
//       validator: isFieldFilledIn,
//     },
//     applicant2Address2: {
//       id: 'address2',
//       type: 'text',
//       classes: 'govuk-label',
//       label: l => l.line2Optional,
//       labelSize: null,
//     },
//     applicant2Address3: {
//       id: 'address3',
//       type: 'text',
//       classes: 'govuk-label',
//       label: l => l.line3Optional,
//       labelSize: null,
//     },
//     applicant2AddressTown: {
//       id: 'addressTown',
//       type: 'text',
//       classes: 'govuk-label govuk-!-width-two-thirds',
//       label: l => l.town,
//       labelSize: null,
//       validator: (value, formData) => {
//         if (!isCountryUk(formData.applicant2AddressCountry)) {
//           return;
//         }
//         return isFieldFilledIn(value);
//       },
//     },
//     applicant2AddressCounty: {
//       id: 'addressCounty',
//       type: 'text',
//       classes: 'govuk-label govuk-!-width-two-thirds',
//       label: l => l.county,
//       labelSize: null,
//     },
//     applicant2AddressPostcode: {
//       id: 'addressPostcode',
//       type: 'text',
//       classes: 'govuk-label govuk-input--width-10',
//       autocomplete: 'postal-code',
//       label: l => l.postcode,
//       labelSize: null,
//       attributes: {
//         maxLength: 14,
//       },
//       validator: (value, formData) => {
//         if (!isCountryUk(formData.applicant2AddressCountry)) {
//           return;
//         }
//         return isInvalidPostcode(value);
//       },
//     },
//     applicant2AddressCountry: {
//       id: 'addressCountry',
//       type: 'text',
//       classes: 'govuk-label govuk-!-width-two-thirds',
//       label: l => l.country,
//       labelSize: null,
//       validator: isFieldFilledIn,
//     },
//     applicant2AddressOverseas: {
//       id: 'addressOverseas',
//       type: 'radios',
//       classes: 'govuk-radios--inline',
//       label: l => l.addressOverseas,
//       values: [
//         { label: l => l.yes, value: YesOrNo.YES },
//         { label: l => l.no, value: YesOrNo.NO },
//       ],
//     },
//     previousAddress1: {
//       id: 'previousAddress1',
//       type: 'hidden',
//       label: l => l.buildingStreet,
//       labelSize: null,
//       validator: isFieldFilledIn,
//     },
//     previousApplicant2Address2: {
//       id: 'previousApplicant2Address2',
//       type: 'hidden',
//       classes: 'govuk-label',
//       label: l => l.line2Optional,
//       labelSize: null,
//     },
//     previousApplicant2Address3: {
//       id: 'previousApplicant2Address3',
//       type: 'hidden',
//       classes: 'govuk-label',
//       label: l => l.line3Optional,
//       labelSize: null,
//     },
//     previousAddressTown: {
//       id: 'previousAddressTown',
//       type: 'hidden',
//       classes: 'govuk-label govuk-!-width-two-thirds',
//       label: l => l.town,
//       labelSize: null,
//       validator: (value, formData) => {
//         if (!isCountryUk(formData.applicant2AddressCountry)) {
//           return;
//         }
//         return isFieldFilledIn(value);
//       },
//     },
//     previousAddressCounty: {
//       id: 'previousAddressCounty',
//       type: 'text',
//       classes: 'govuk-label govuk-!-width-two-thirds',
//       label: l => l.county,
//       labelSize: null,
//     },
//     previousAddressPostcode: {
//       id: 'previousAddressPostcode',
//       type: 'hidden',
//       classes: 'govuk-label govuk-input--width-10',
//       autocomplete: 'postal-code',
//       label: l => l.postcode,
//       labelSize: null,
//       attributes: {
//         maxLength: 14,
//       },
//       validator: (value, formData) => {
//         if (!isCountryUk(formData.applicant2AddressCountry)) {
//           return;
//         }
//         return isInvalidPostcode(value);
//       },
//     },
//     previousAddressCountry: {
//       id: 'previousAddressCountry',
//       type: 'text',
//       classes: 'govuk-label govuk-!-width-two-thirds',
//       label: l => l.country,
//       labelSize: null,
//       validator: isFieldFilledIn,
//     },
//     previousAddressOverseas: {
//       id: 'previousAddressOverseas',
//       type: 'radios',
//       classes: 'govuk-radios--inline',
//       label: l => l.addressOverseas,
//       values: [
//         { label: l => l.yes, value: YesOrNo.YES },
//         { label: l => l.no, value: YesOrNo.NO },
//       ],
//     },
//   },
//   submit: {
//     text: l => l.continue,
//   },
// };

export const generateContent: TranslationFn = content => {
  const userCase = content.userCase;

  if (!userCase.previousApplicant2Address1) {
    userCase.previousApplicant2Address1 = userCase.applicant2Address1;
    userCase.previousApplicant2Address2 = userCase.applicant2Address2;
    userCase.previousApplicant2Address3 = userCase.applicant2Address3;
    userCase.previousApplicant2AddressTown = userCase.applicant2AddressTown;
    userCase.previousApplicant2AddressCounty = userCase.applicant2AddressCounty;
    userCase.previousApplicant2AddressPostcode = userCase.applicant2AddressPostcode;
  }

  userCase.applicant2Address1 = '';
  userCase.applicant2Address2 = '';
  userCase.applicant2Address3 = '';
  userCase.applicant2AddressTown = '';
  userCase.applicant2AddressCounty = '';
  userCase.applicant2AddressCountry = '';
  userCase.applicant2AddressPostcode = '';

  return {
    ...applicant1GenerateContent(content),
    form,
  };
};
