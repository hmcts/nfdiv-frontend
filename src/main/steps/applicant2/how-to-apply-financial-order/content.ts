import { TranslationFn } from '../../../app/controller/GetController';
import { generateContent as applicant1GenerateContent } from '../../applicant1/how-to-apply-financial-order/content';

export const generateContent: TranslationFn = content => {
  return applicant1GenerateContent(content);
};
