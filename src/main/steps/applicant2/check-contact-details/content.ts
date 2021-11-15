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
    content.formState?.applicant2Address1,
    content.formState?.applicant2Address2,
    content.formState?.applicant2Address3,
    content.formState?.applicant2AddressTown,
    content.formState?.applicant2AddressCounty,
    content.formState?.applicant2AddressPostcode,
    content.formState?.applicant2AddressCountry,
  ]
    .filter(Boolean)
    .join('<br>');
  const phoneNumber = content.formState?.applicant2PhoneNumber;
  const translations = languages[content.language]();
  const prefixUrl =
    content.formState?.applicationType === ApplicationType.SOLE_APPLICATION ? '/respondent' : '/applicant2';
  return {
    ...translations,
    applicantAddress,
    phoneNumber,
    prefixUrl,
  };
};
