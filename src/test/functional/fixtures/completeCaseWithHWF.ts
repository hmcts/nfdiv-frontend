import { ApplicationType, YesOrNo } from '../../../main/app/case/definition';
import { BrowserCase } from '../../steps/common';

import { completeCase } from './completeCase';

export const completeCaseWithHWF: Partial<BrowserCase> = {
  ...completeCase,
  applicationType: ApplicationType.JOINT_APPLICATION,
  applicant1HelpPayingNeeded: YesOrNo.YES,
  applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
  applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
};
