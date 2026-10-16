import { TranslationFn } from '../../../../app/controller/GetController.js';
import { generateContent as applicationWithdrawnGenerateContent } from '../../../applicant1/withdraw-pre-issue/application-withdrawn/content.js';

export const generateContent: TranslationFn = content => {
  const appWithdrawnContent = applicationWithdrawnGenerateContent(content);
  return {
    ...appWithdrawnContent,
  };
};
