import { YesOrNo } from '../../../main/app/case/definition';
import { BrowserCase } from '../../steps/common';

import { completeCase } from './completeCase';

export const finalOrderCompleteCase: Partial<BrowserCase> = {
  ...completeCase,
  dateFinalOrderNoLongerEligible: '2030-10-01',
  applicant1AppliedForFinalOrderFirst: YesOrNo.YES,
};
