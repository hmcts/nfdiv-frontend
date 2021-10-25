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
  const address = [content.formState?.applicant1Address1];
  address.push(content.formState?.applicant1Address2);
  address.push(content.formState?.applicant1Address3);
  address.push(content.formState?.applicant1AddressTown);
  address.push(content.formState?.applicant1AddressCounty);
  address.push(content.formState?.applicant1AddressPostcode);
  address.push(content.formState?.applicant1AddressCountry);
  const applicantAddress = address.filter(Boolean).join('<br>');
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
