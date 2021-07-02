import { YesOrNo } from '../../../main/app/case/definition';
import { BrowserCase } from '../../steps/common';

import { completeCase } from './completeCase';
import { jointApplicant1CompleteCase } from './jointApplicant1CompleteCase';

export const completeCaseWithHWF: Partial<BrowserCase> = {
  ...completeCase,
  applicant1HelpPayingNeeded: YesOrNo.YES,
  applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
  applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
};

export const jointCompleteCaseWithHWF: Partial<BrowserCase> = {
  ...jointApplicant1CompleteCase,
  applicant1HelpPayingNeeded: YesOrNo.YES,
  applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
  applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
};
