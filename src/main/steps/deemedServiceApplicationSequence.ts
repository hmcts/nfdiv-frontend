import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  APPLY_FOR_HWF_DEEMED,
  CHECK_ANSWERS_DEEMED,
  DEEMED_INTERRUPTION,
  DEEMED_SERVICE_APPLICATION,
  HELP_WITH_FEES_DEEMED,
  HOW_DO_YOU_KNOW_DEEMED,
  HUB_PAGE,
  SERVICE_APPLICATION_SUBMITTED,
  HWF_REFERENCE_NUMBER_DEEMED,
  HWF_REFERENCE_NUMBER_INPUT_DEEMED,
  PAY_YOUR_SERVICE_FEE,
  SERVICE_PAYMENT_CALLBACK,
  UPLOAD_EVIDENCE_DEEMED,
  WANT_UPLOAD_EVIDENCE_DEEMED,
  WHY_NO_EVIDENCE_DEEMED,
} from './urls';

export const deemedServiceApplicationSequence: Step[] = [
  {
    url: DEEMED_SERVICE_APPLICATION,
    getNextStep: () => DEEMED_INTERRUPTION,
  },
  {
    url: DEEMED_INTERRUPTION,
    getNextStep: () => HELP_WITH_FEES_DEEMED,
  },
  {
    url: HELP_WITH_FEES_DEEMED,
    getNextStep: data =>
      data?.applicant1InterimAppsUseHelpWithFees === YesOrNo.YES
        ? HWF_REFERENCE_NUMBER_DEEMED
        : WANT_UPLOAD_EVIDENCE_DEEMED,
  },
  {
    url: HWF_REFERENCE_NUMBER_DEEMED,
    getNextStep: data =>
      data?.applicant1InterimAppsHaveHwfReference === YesOrNo.YES
        ? HWF_REFERENCE_NUMBER_INPUT_DEEMED
        : APPLY_FOR_HWF_DEEMED,
  },
  {
    url: HWF_REFERENCE_NUMBER_INPUT_DEEMED,
    getNextStep: () => WANT_UPLOAD_EVIDENCE_DEEMED,
  },
  {
    url: APPLY_FOR_HWF_DEEMED,
    getNextStep: () => HWF_REFERENCE_NUMBER_INPUT_DEEMED,
  },
  {
    url: WANT_UPLOAD_EVIDENCE_DEEMED,
    getNextStep: data =>
      data?.applicant1InterimAppsCanUploadEvidence === YesOrNo.YES ? UPLOAD_EVIDENCE_DEEMED : WHY_NO_EVIDENCE_DEEMED,
  },
  {
    url: WHY_NO_EVIDENCE_DEEMED,
    getNextStep: () => CHECK_ANSWERS_DEEMED,
  },
  {
    url: UPLOAD_EVIDENCE_DEEMED,
    getNextStep: () => HOW_DO_YOU_KNOW_DEEMED,
  },
  {
    url: HOW_DO_YOU_KNOW_DEEMED,
    getNextStep: () => CHECK_ANSWERS_DEEMED,
  },
  {
    url: CHECK_ANSWERS_DEEMED,
    getNextStep: data => data?.alternativeServiceFeeRequired === YesOrNo.YES
      ? PAY_YOUR_SERVICE_FEE
      : SERVICE_APPLICATION_SUBMITTED,
  },
  {
    url: PAY_YOUR_SERVICE_FEE,
    getNextStep: () => SERVICE_PAYMENT_CALLBACK,
  },
  {
    url: SERVICE_PAYMENT_CALLBACK,
    getNextStep: () => SERVICE_APPLICATION_SUBMITTED,
  },
  {
    url: SERVICE_APPLICATION_SUBMITTED,
    getNextStep: () => HUB_PAGE,
  }
];
