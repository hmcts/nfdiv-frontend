import { TranslationFn } from '../../../app/controller/GetController.js';
import { form as soleForm, generateContent as soleGenerateContent } from '../enter-your-name/content.js';

export const form = soleForm;

export const generateContent: TranslationFn = content => {
  const soleContent = soleGenerateContent(content);
  return {
    ...soleContent,
    form,
  };
};
