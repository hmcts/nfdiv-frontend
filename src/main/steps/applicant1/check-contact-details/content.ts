import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  title: 'Review your contact details',
  yourAddress: 'Your address',
  yourPhoneNumber: 'Your phone number',
  detailsCorrect: 'Are these details correct and up to date?',
  upToDate: 'Yes, these details are up to date',
  needUpdating: 'No, I want to update my contact details',
});

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    inTheUk: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l[YesOrNo.YES], value: YesOrNo.YES },
        { label: l => l[YesOrNo.NO], value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
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
  const applicantAddress = [
    content.userCase?.applicant1Address1,
    content.userCase?.applicant1Address2,
    content.userCase?.applicant1Address3,
    content.userCase?.applicant1AddressTown,
    content.userCase?.applicant1AddressCounty,
    content.userCase?.applicant1AddressPostcode,
    content.userCase?.applicant1AddressCountry,
  ]
    .filter(Boolean)
    .join('<br>');
  const phoneNumber = content.userCase?.applicant1PhoneNumber;
  const translations = languages[content.language]();
  const prefixUrl = '';
  return {
    ...translations,
    applicantAddress,
    phoneNumber,
    prefixUrl,
  };
};
