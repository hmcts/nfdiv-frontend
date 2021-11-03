import { ApplicationType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { generateContent as applicant1GenerateContent } from '../../applicant1/check-contact-details/content';

export const generateContent: TranslationFn = content => {
  const { formState } = content;
  const address = `
    ${formState?.applicant2Address1}<br>
    ${formState?.applicant2Address2}<br>
    ${formState?.applicant2Address3}<br>
    ${formState?.applicant2AddressTown}<br>
    ${formState?.applicant2AddressCounty}<br>
    ${formState?.applicant2AddressPostcode}<br>
    ${formState?.applicant2AddressCountry}
  `;
  const phoneNumber = content.formState?.applicant2PhoneNumber;
  const prefixUrl =
    content.formState?.applicationType === ApplicationType.SOLE_APPLICATION ? '/respondent' : '/applicant2';
  const translations = applicant1GenerateContent(content);
  return {
    ...translations,
    address,
    phoneNumber,
    prefixUrl,
  };
};
