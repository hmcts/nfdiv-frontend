import { BrowserCase } from '../../steps/common.js';

import { completeCase } from './completeCase.js';

export const finalOrderCompleteCase: Partial<BrowserCase> = {
  ...completeCase,
  dateFinalOrderNoLongerEligible: '2030-10-01',
};
