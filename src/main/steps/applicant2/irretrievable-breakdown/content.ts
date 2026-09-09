import { TranslationFn } from '../../../app/controller/GetController.js';
import { FormContent, FormFields } from '../../../app/form/Form.js';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/irretrievable-breakdown/content.js';
import { CommonContent } from '../../common/common.content.js';

const labels = ({ required }: CommonContent) => {
  return {
    errors: {
      applicant2ScreenHasUnionBroken: {
        required,
      },
    },
  };
};

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2ScreenHasUnionBroken: (applicant1Form.fields as FormFields).applicant1ScreenHasUnionBroken,
  },
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(content),
    form,
  };
};
