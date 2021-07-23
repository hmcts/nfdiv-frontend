import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/confirm-your-joint-application/content';

const labels = applicant1Content => {
  return {
    errors: {
      applicant2IConfirmPrayer: {
        ...applicant1Content.errors.applicant1IConfirmPrayer,
      },
      applicant2IBelieveApplicationIsTrue: {
        ...applicant1Content.errors.applicant1IBelieveApplicationIsTrue,
      },
    },
  };
};

const applicant1FormFields = applicant1Form.fields as FormFields;
export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2IConfirmPrayer: applicant1FormFields.applicant1IConfirmPrayer,
    applicant2IBelieveApplicationIsTrue: applicant1FormFields.applicant1IBelieveApplicationIsTrue,
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
