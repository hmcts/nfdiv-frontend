import { TranslationFn } from '../../../../../app/controller/GetController';
import { generateContent as applyForHwfGenerateContent } from '../../common/apply-for-hwf/content';

export const generateContent: TranslationFn = content => {
  const applyForHwfContent = applyForHwfGenerateContent(content);
  return {
    ...applyForHwfContent,
  };
};
