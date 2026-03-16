import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { CHECK_ANSWERS_WITHDRAW, HUB_PAGE, WITHDRAW_CONFIRMATION, WITHDRAW_THIS_APPLICATION } from './urls';

export const withdrawApplicationSequence: Step[] = [
  {
    url: WITHDRAW_THIS_APPLICATION,
    getNextStep: data => (data?.confirmWithdrawApplication === YesOrNo.YES ? CHECK_ANSWERS_WITHDRAW : HUB_PAGE),
  },
  {
    url: CHECK_ANSWERS_WITHDRAW,
    getNextStep: () => WITHDRAW_CONFIRMATION,
  },
];
