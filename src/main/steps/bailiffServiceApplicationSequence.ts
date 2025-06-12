import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  APPLY_FOR_HWF_BAILIFF,
  BAILIFF_SERVICE_APPLICATION,
  ENTER_PARTNERS_NAME_BAILIFF,
  HELP_WITH_FEES_BAILIFF,
  HWF_REFERENCE_NUMBER_BAILIFF,
  HWF_REFERENCE_NUMBER_INPUT_BAILIFF,
} from './urls';

export const bailiffServiceApplicationSequence: Step[] = [
  {
    url: BAILIFF_SERVICE_APPLICATION,
    getNextStep: () => HELP_WITH_FEES_BAILIFF,
  },
  {
    url: HELP_WITH_FEES_BAILIFF,
    getNextStep: data =>
      data?.applicant1InterimAppsUseHelpWithFees === YesOrNo.YES
        ? HWF_REFERENCE_NUMBER_BAILIFF
        : ENTER_PARTNERS_NAME_BAILIFF,
  },
  {
    url: HWF_REFERENCE_NUMBER_BAILIFF,
    getNextStep: data =>
      data?.applicant1InterimAppsHaveHwfReference === YesOrNo.YES
        ? HWF_REFERENCE_NUMBER_INPUT_BAILIFF
        : APPLY_FOR_HWF_BAILIFF,
  },
  {
    url: APPLY_FOR_HWF_BAILIFF,
    getNextStep: () => HWF_REFERENCE_NUMBER_INPUT_BAILIFF,
  },
  {
    url: HWF_REFERENCE_NUMBER_INPUT_BAILIFF,
    getNextStep: () => ENTER_PARTNERS_NAME_BAILIFF,
  },
  {
    url: ENTER_PARTNERS_NAME_BAILIFF,
    getNextStep: () => ENTER_PARTNERS_NAME_BAILIFF,
  }
];
