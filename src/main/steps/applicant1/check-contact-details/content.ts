import { TranslationFn } from '../../../app/controller/GetController';

const en = () => ({
  title: 'Review your contact details',
  yourAddress: 'Your address',
  yourPhoneNumber: 'Your phone number',
});

// @TODO translations
const cy = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { formState } = content;
  const address = `
    ${formState?.applicant1Address1}<br>
    ${formState?.applicant1Address2}<br>
    ${formState?.applicant1Address3}<br>
    ${formState?.applicant1AddressTown}<br>
    ${formState?.applicant1AddressCounty}<br>
    ${formState?.applicant1AddressPostcode}<br>
    ${formState?.applicant1AddressCountry}
  `;
  const phoneNumber = content.formState?.applicant1PhoneNumber;
  const translations = languages[content.language]();
  const prefixUrl = '';
  return {
    ...translations,
    address,
    phoneNumber,
    prefixUrl,
  };
};
