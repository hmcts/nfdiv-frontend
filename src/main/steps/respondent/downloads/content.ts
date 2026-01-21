import { TranslationFn } from '../../../app/controller/GetController';
import { generateContent as downloadPageContent } from '../../applicant1/downloads/content';

export const generateContent: TranslationFn = content => {
  const downloadsContent = downloadPageContent(content);
  return {
    ...downloadsContent,
  };
};
