import { YesOrNo } from '../../../main/app/case/definition';
import { BrowserCase } from '../../steps/common';

import { completeCase } from './completeCase';

export const finalOrderOverdueCompleteCase: Partial<BrowserCase> = {
  ...completeCase,
  isFinalOrderOverdue: YesOrNo.YES,
  dateFinalOrderEligibleToRespondent: '2021-01-01',
  dateFinalOrderNoLongerEligible: '2021-10-01',
};
