import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as generateApplicant1Content,
} from '../../irretrievable-breakdown/content';

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2ScreenHasUnionBroken: (applicant1Form.fields as FormFields).applicant1ScreenHasUnionBroken,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = generateApplicant1Content(content);
  return {
    ...translations,
    errors: {
      applicant2ScreenHasUnionBroken: {
        required: content.required,
      },
    },
    form,
  };
};
