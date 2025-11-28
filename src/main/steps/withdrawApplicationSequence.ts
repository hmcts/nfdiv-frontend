import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { CHECK_ANSWERS_WITHDRAW, HOME_URL, WITHDRAW_CONFIRMATION, WITHDRAW_THIS_APPLICATION } from './urls';

export const withdrawApplicationSequence: Step[] = [
  {
    url: WITHDRAW_THIS_APPLICATION,
    getNextStep: data => (data?.confirmWithdrawApplication === YesOrNo.YES ? CHECK_ANSWERS_WITHDRAW : HOME_URL),
  },
  {
    url: CHECK_ANSWERS_WITHDRAW,
    getNextStep: () => WITHDRAW_CONFIRMATION,
  },
];
