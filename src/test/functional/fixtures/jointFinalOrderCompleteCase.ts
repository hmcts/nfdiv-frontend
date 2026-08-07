import { BrowserCase } from '../../steps/common.js';

import { jointApplicant1CompleteCase } from './jointApplicant1CompleteCase.js';

export const jointFinalOrderCompleteCase: Partial<BrowserCase> = {
  ...jointApplicant1CompleteCase,
  dateFinalOrderNoLongerEligible: '2030-10-01',
};
