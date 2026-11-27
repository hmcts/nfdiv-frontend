import { BrowserCase } from '../../steps/commonHelpers/case-interaction';

import { completeCase } from './completeCase';

export const finalOrderCompleteCase: Partial<BrowserCase> = {
  ...completeCase,
  dateFinalOrderNoLongerEligible: '2030-10-01',
};
