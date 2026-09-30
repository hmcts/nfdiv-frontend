import { TranslationFn } from '../../../app/controller/GetController.js';
import { generateContent as soleGenerateContent } from '../application-submitted/content.js';

export const generateContent: TranslationFn = content => {
  const soleContent = soleGenerateContent(content);
  return {
    ...soleContent,
  };
};
