import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { form as applicant1Form, generateContent as applicant1GenerateContent } from '../../enter-your-address/content';

const labels = applicant1Content => ({
  errors: {
    applicant2Address1: {
      required: applicant1Content.errors.applicant1Address1,
    },
    applicant2AddressTown: {
      required: applicant1Content.errors.applicant1AddressTown,
    },
    addressPostcode: applicant1Content.errors.addressPostcode,
    applicant2AddressPostcode: applicant1Content.errors.applicant2AddressPostcode,
    applicant2AddressCountry: applicant1Content.errors.applicant2AddressCountry,
  },
});

const applicant1FormFields = applicant1Form.fields as FormFields;
export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2Address1: applicant1FormFields.applicant1Address1,
    applicant2Address2: applicant1FormFields.applicant1Address2,
    applicant2Address3: applicant1FormFields.applicant1Address3,
    applicant2AddressTown: applicant1FormFields.applicant1AddressTown,
    applicant2AddressCounty: applicant1FormFields.applicant1AddressCounty,
    applicant2AddressPostcode: applicant1FormFields.applicant1AddressPostcode,
    applicant2AddressCountry: applicant1FormFields.applicant1AddressCountry,
  },
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(applicant1Content),
    form,
  };
};
