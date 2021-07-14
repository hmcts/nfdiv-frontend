import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { generateContent as applicant1GenerateContent } from '../../applicant1/check-your-answers/content';

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    form,
  };
};
