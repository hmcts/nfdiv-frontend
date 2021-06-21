import { TranslationFn } from '../../app/controller/GetController';
import { FormContent, FormFields } from '../../app/form/Form';
import { CommonContent } from '../common/common.content';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../irretrievable-breakdown/content';

const labels = ({ required }: CommonContent) => {
  return {
    errors: {
      screenHasApplicant2UnionBroken: {
        required,
      },
    },
  };
};

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    screenHasApplicant2UnionBroken: (applicant1Form.fields as FormFields).screenHasUnionBroken,
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
