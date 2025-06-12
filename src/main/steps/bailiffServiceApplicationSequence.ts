import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  APPLY_FOR_HWF_BAILIFF,
  BAILIFF_SERVICE_APPLICATION,
  ENTER_PARTNERS_NAME_BAILIFF,
  HELP_WITH_FEES_BAILIFF,
  HWF_REFERENCE_NUMBER_BAILIFF,
  HWF_REFERENCE_NUMBER_INPUT_BAILIFF,
  PARTNER_IN_REFUGE_BAILIFF,
  PARTNER_ADDRESS_BAILIFF,
  PARTNER_PHONE_NUMBER_BAILIFF
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
    getNextStep: () => PARTNER_IN_REFUGE_BAILIFF,
  },
  {
    url: PARTNER_IN_REFUGE_BAILIFF,
    getNextStep: () => PARTNER_ADDRESS_BAILIFF,
  },
  {
    url: PARTNER_ADDRESS_BAILIFF,
    getNextStep: () => PARTNER_PHONE_NUMBER_BAILIFF,
  },
  {
    url: PARTNER_PHONE_NUMBER_BAILIFF,
    getNextStep: () => PARTNER_PHONE_NUMBER_BAILIFF,
  }
];
