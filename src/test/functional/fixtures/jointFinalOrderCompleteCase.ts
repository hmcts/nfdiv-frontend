import { BrowserCase } from '../../steps/commonHelpers/caseInteraction';

import { jointApplicant1CompleteCase } from './jointApplicant1CompleteCase';

export const jointFinalOrderCompleteCase: Partial<BrowserCase> = {
  ...jointApplicant1CompleteCase,
  dateFinalOrderNoLongerEligible: '2030-10-01',
};
