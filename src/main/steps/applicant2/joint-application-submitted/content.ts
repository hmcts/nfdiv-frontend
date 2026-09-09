import { TranslationFn } from '../../../app/controller/GetController.js';
import { generateContent as applicant1GenerateContent } from '../../applicant1/joint-application-submitted/content.js';

export const generateContent: TranslationFn = content => {
  const applicant1GenerateContent1 = applicant1GenerateContent(content);
  return {
    ...applicant1GenerateContent1,
  };
};
