import { YesOrNo } from '../../../main/app/case/definition.js';
import { BrowserCase } from '../../steps/common.js';

import { completeCase } from './completeCase.js';

export const finalOrderOverdueCompleteCase: Partial<BrowserCase> = {
  ...completeCase,
  isFinalOrderOverdue: YesOrNo.YES,
  dateFinalOrderEligibleToRespondent: '2021-01-01',
  dateFinalOrderNoLongerEligible: '2021-10-01',
};
