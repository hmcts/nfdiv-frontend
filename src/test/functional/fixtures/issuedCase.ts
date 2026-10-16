import { BrowserCase } from '../../steps/common.js';

import { completeCase } from './completeCase.js';

export const issuedCase: Partial<BrowserCase> = {
  ...completeCase,
  accessCode: '1234ABCD',
  // Set this via superuser within the test - citizens cannot set issueDate
  // issueDate: '2023-10-31',
};
