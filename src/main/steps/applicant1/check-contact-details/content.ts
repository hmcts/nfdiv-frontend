import { TranslationFn } from '../../../app/controller/GetController';

const en = () => ({
  title: 'Review your contact details',
  yourAddress: 'Your address',
  yourPhoneNumber: 'Your phone number',
  continue: 'Continue',
  change: 'Change',
});

const cy = () => ({
  title: 'Adolygu eich manylion cyswllt',
  yourAddress: 'Eich cyfeiriad',
  yourPhoneNumber: 'Eich rhif ffôn',
  continue: 'Parhau',
  change: 'Newid',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
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
  const prefixUrl = '';
  return {
    ...translations,
    applicantAddress,
    phoneNumber,
    prefixUrl,
  };
};
