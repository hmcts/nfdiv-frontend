import { generatePageContent } from '../../../main/steps/common/common.content';

export const defaultViewArgs = {
  ...generatePageContent('en'),
  sessionErrors: expect.any(Array),
  getNextIncompleteStepUrl: expect.any(Function),
  isDivorce: expect.any(Boolean),
  partner: expect.any(String),
  formState: expect.any(Object),
  language: expect.any(String),
  htmlLang: expect.any(String),
};
