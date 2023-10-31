import { BrowserCase } from '../../steps/common';

import { completeCase } from './completeCase';

export const issuedCase: Partial<BrowserCase> = {
  ...completeCase,
  accessCode: '1234ABCD',
  issueDate: '2023-10-31',
};
