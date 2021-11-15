import { ApplicationType } from '../../../app/case/definition';
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
    content.userCase?.applicant2Address1,
    content.userCase?.applicant2Address2,
    content.userCase?.applicant2Address3,
    content.userCase?.applicant2AddressTown,
    content.userCase?.applicant2AddressCounty,
    content.userCase?.applicant2AddressPostcode,
    content.userCase?.applicant2AddressCountry,
  ]
    .filter(Boolean)
    .join('<br>');
  const phoneNumber = content.userCase?.applicant2PhoneNumber;
  const translations = languages[content.language]();
  const prefixUrl =
    content.userCase?.applicationType === ApplicationType.SOLE_APPLICATION ? '/respondent' : '/applicant2';
  return {
    ...translations,
    applicantAddress,
    phoneNumber,
    prefixUrl,
  };
};
