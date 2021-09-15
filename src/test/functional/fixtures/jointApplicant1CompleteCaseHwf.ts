import { YesOrNo } from '../../../main/app/case/definition';
import { BrowserCase } from '../../steps/common';

import { jointApplicant1CompleteCase } from './jointApplicant1CompleteCase';

export const jointApplicant1CompleteCaseHwf: Partial<BrowserCase> = {
  ...jointApplicant1CompleteCase,
  applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
};
