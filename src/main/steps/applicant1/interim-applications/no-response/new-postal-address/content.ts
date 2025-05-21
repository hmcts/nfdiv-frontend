import { TranslationFn } from '../../../../../app/controller/GetController';
import { generateContent as applicant1GenerateContent } from '../../../../applicant1/enter-their-address/content';

export const generateContent: TranslationFn = content => {
  return {
    ...applicant1GenerateContent(content),
  };
};
