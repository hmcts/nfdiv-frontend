import { YesOrNo } from '../../../main/app/case/definition';
import { BrowserCase } from '../../steps/common';

import { jointApplicant2CompleteCase } from './jointApplicant2CompleteCase';

export const jointApplicant2CompleteCaseNoHwf: Partial<BrowserCase> = {
  ...jointApplicant2CompleteCase,
  applicant2AlreadyAppliedForHelpPaying: YesOrNo.NO,
};
