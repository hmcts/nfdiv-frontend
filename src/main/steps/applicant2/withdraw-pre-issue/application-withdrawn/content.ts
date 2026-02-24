import { TranslationFn } from '../../../../app/controller/GetController';
import { generateContent as applicationWithdrawnGenerateContent } from '../../../applicant1/withdraw-pre-issue/application-withdrawn/content';

export const generateContent: TranslationFn = content => {
  const appWithdrawnContent = applicationWithdrawnGenerateContent(content);
  return {
    ...appWithdrawnContent,
  };
};
