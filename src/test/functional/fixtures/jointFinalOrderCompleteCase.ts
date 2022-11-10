import { BrowserCase } from '../../steps/common';

import { jointApplicant1CompleteCase } from './jointApplicant1CompleteCase';

export const jointFinalOrderCompleteCase: Partial<BrowserCase> = {
  ...jointApplicant1CompleteCase,
  dateFinalOrderNoLongerEligible: '2020-10-01',
};
