import { TranslationFn } from '../../../app/controller/GetController';
import { generateContent as soleGenerateContent } from '../application-submitted/content';

export const generateContent: TranslationFn = content => {
  const soleContent = soleGenerateContent(content);
  return {
    ...soleContent,
  };
};
