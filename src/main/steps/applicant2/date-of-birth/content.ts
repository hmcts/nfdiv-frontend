import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/date-of-birth/content';

const labels = content => ({
  errors: {
    applicant2DateOfBirth: content.errors.applicant1DateOfBirth,
  },
});

const applicant1FormFields = applicant1Form.fields as FormFields;
export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2DateOfBirth: {
      ...applicant1FormFields.applicant1DateOfBirth,
      parser: body => covertToDateObject('applicant2DateOfBirth', body as Record<string, unknown>),
    },
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
