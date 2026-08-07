import { TranslationFn } from '../../../app/controller/GetController.js';
import { generateViewAnswersContent as viewGenerateContent } from '../../applicant1/check-your-answers/content.js';

export const generateContent: TranslationFn = content => {
  return viewGenerateContent(content);
};
