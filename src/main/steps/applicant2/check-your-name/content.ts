import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/check-your-name/content';

const labels = content => ({
  errors: {
    applicant2NameDifferentToMarriageCertificate: content.errors.applicant1NameDifferentToMarriageCertificate,
  },
});

const applicant1FormFields = applicant1Form.fields as FormFields;
export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2NameDifferentToMarriageCertificate: applicant1FormFields.applicant1NameDifferentToMarriageCertificate,
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
