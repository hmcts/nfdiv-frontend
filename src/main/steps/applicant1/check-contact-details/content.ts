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
  const applicantAddress = [
    content.formState?.applicant1Address1,
    content.formState?.applicant1Address2,
    content.formState?.applicant1Address3,
    content.formState?.applicant1AddressTown,
    content.formState?.applicant1AddressCounty,
    content.formState?.applicant1AddressPostcode,
    content.formState?.applicant1AddressCountry,
  ]
    .filter(Boolean)
    .join('<br>');
  const phoneNumber = content.formState?.applicant1PhoneNumber;
  const translations = languages[content.language]();
  const prefixUrl = '';
  return {
    ...translations,
    applicantAddress,
    phoneNumber,
    prefixUrl,
  };
};
