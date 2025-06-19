import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  APPLY_FOR_HWF_DISPENSE, AWARE_PARTNER_ADDRESS_DISPENSE,
  DISPENSE_SERVICE_APPLICATION,
  HELP_WITH_FEES_DISPENSE,
  HUB_PAGE,
  HWF_REFERENCE_NUMBER_DISPENSE,
  HWF_REFERENCE_NUMBER_INPUT_DISPENSE,
  LAST_ADDRESS_DISPENSE,
  LAST_DATE_DISPENSE
} from "./urls";

export const dispenseServiceApplicationSequence: Step[] = [
  {
    url: DISPENSE_SERVICE_APPLICATION,
    getNextStep: () => HELP_WITH_FEES_DISPENSE,
  },
  {
    url: HELP_WITH_FEES_DISPENSE,
    getNextStep: data =>
      data?.applicant1InterimAppsUseHelpWithFees === YesOrNo.YES ? HWF_REFERENCE_NUMBER_DISPENSE : LAST_DATE_DISPENSE,
  },
  {
    url: HWF_REFERENCE_NUMBER_DISPENSE,
    getNextStep: data =>
      data?.applicant1InterimAppsHaveHwfReference === YesOrNo.YES
        ? HWF_REFERENCE_NUMBER_INPUT_DISPENSE
        : APPLY_FOR_HWF_DISPENSE,
  },
  {
    url: HWF_REFERENCE_NUMBER_INPUT_DISPENSE,
    getNextStep: () => LAST_DATE_DISPENSE,
  },
  {
    url: APPLY_FOR_HWF_DISPENSE,
    getNextStep: () => HWF_REFERENCE_NUMBER_INPUT_DISPENSE,
  },
  {
    url: LAST_DATE_DISPENSE,
    getNextStep: () => LAST_ADDRESS_DISPENSE,
  },
  {
    url: LAST_ADDRESS_DISPENSE,
    getNextStep: () => AWARE_PARTNER_ADDRESS_DISPENSE,
  },
  {
    url: AWARE_PARTNER_ADDRESS_DISPENSE,
    getNextStep: () => HUB_PAGE,
  },
];
