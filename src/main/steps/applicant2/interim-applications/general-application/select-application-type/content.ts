import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import {
  generateContent as applicant1GenerateContent,
  applicant2Form,
} from '../../../../applicant1/interim-applications/general-application/select-application-type/content';

export const form: FormContent = applicant2Form;
export const generateContent: TranslationFn = content => {
  return {
    ...applicant1GenerateContent(content),
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
