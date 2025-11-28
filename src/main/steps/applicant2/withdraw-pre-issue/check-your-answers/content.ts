import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import {
  generateContent as CheckAnswersGenerateContent,
  form as checkAnswersForm,
} from '../../../applicant1/withdraw-pre-issue/check-your-answers/content';

export const form: FormContent = checkAnswersForm;

export const generateContent: TranslationFn = content => {
  const checkAnswersGenerateContent = CheckAnswersGenerateContent(content);
  return {
    ...checkAnswersGenerateContent,
  };
};
