import { generatePageContent } from '../../../main/steps/common/common.content';

export const defaultViewArgs = {
  ...generatePageContent({ language: 'en', userEmail: 'test@example.com', userCase: expect.any(Object) }),
  serviceName: expect.any(String),
  sessionErrors: expect.any(Array),
  getNextIncompleteStepUrl: expect.any(Function),
  isAmendableStates: expect.any(Boolean),
  isDivorce: expect.any(Boolean),
  isApplicant2: expect.any(Boolean),
  partner: expect.any(String),
  userCase: expect.any(Object),
  language: expect.any(String),
  htmlLang: expect.any(String),
  userEmail: expect.any(String),
  contactEmail: expect.any(String),
};
