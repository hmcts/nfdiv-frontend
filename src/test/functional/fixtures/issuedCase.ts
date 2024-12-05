import { BrowserCase } from '../../steps/common';

import { completeCase } from './completeCase';

export const issuedCase: Partial<BrowserCase> = {
  ...completeCase,
  accessCode: '1234ABCD',
  // Set this via superuser within the test - citizens cannot set issueDate
  // issueDate: '2023-10-31',
};
