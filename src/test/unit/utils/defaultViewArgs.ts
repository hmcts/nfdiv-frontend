import { generatePageContent } from '../../../main/steps/common/common.content';

export const defaultViewArgs = {
  ...generatePageContent({ language: 'en', userEmail: 'test@example.com' }),
  serviceName: expect.any(String),
  sessionErrors: expect.any(Array),
  getNextIncompleteStepUrl: expect.any(Function),
  isDivorce: expect.any(Boolean),
  partner: expect.any(String),
  formState: expect.any(Object),
  language: expect.any(String),
  htmlLang: expect.any(String),
  userEmail: expect.any(String),
  contactEmail: expect.any(String),
};
