import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import {
  form as applicant2Form,
  generateContent as applicant2GenerateContent,
} from '../../applicant2/enter-your-access-code/content';

export const form: FormContent = {
  ...applicant2Form,
};

export const generateContent: TranslationFn = content => {
  const applicant2Content = applicant2GenerateContent(content);
  return {
    ...applicant2Content,
    form,
  };
};
