import { TranslationFn } from '../../../app/controller/GetController.js';
import { generateContent as applicant1GenerateContent } from '../../applicant1/apply-for-help-with-fees/content.js';

export const generateContent: TranslationFn = content => {
  return {
    ...applicant1GenerateContent(content),
  };
};
