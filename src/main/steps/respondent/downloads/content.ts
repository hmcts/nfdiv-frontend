import { TranslationFn } from '../../../app/controller/GetController.js';
import { generateContent as downloadPageContent } from '../../applicant1/downloads/content.js';

export const generateContent: TranslationFn = content => {
  const downloadsContent = downloadPageContent(content);
  return {
    ...downloadsContent,
  };
};
