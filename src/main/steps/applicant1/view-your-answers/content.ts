import { TranslationFn } from '../../../app/controller/GetController';
import { generateViewAnswersContent as viewGenerateContent } from '../../applicant1/check-your-answers/content';

export const generateContent: TranslationFn = content => {
  return viewGenerateContent(content);
};
