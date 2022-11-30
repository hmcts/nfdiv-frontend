import { TranslationFn } from '../../../app/controller/GetController';
import { form as soleForm, generateContent as soleGenerateContent } from '../../applicant1/enter-your-name/content';

export const form = soleForm;

export const generateContent: TranslationFn = content => {
  const soleContent = soleGenerateContent(content);
  return {
    ...soleContent,
    form,
  };
};
