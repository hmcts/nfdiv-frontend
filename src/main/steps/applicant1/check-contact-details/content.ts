import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';

const en = () => ({
  title: 'Review your contact details',
  yourAddress: 'Your address',
  yourPhoneNumber: 'Your phone number',
  addressPrivateQuestion: 'Do you need your contact details kept private?',
  inRefugeQuestion: 'Are you currently in a refuge?',
});

// @TODO translations
const cy = en;

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
  const addressPrivate = content.userCase?.applicant1AddressPrivate;
  const inRefuge = content.userCase?.applicant1InRefuge;
  const translations = languages[content.language]();
  const prefixUrl = '';
  return {
    ...translations,
    applicantAddress,
    phoneNumber,
    addressPrivate,
    inRefuge,
    showInRefugeQuestion: addressPrivate === YesOrNo.YES,
    prefixUrl,
  };
};
