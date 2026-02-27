import { GeneralApplicationHearingNotRequired, YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  GENERAL_APPLICATION_SUBMITTED,
  GEN_APP_APPLY_FOR_HWF,
  GEN_APP_CHECK_ANSWERS,
  GEN_APP_COST_OF_APPLICATION,
  GEN_APP_HELP_WITH_FEES,
  GEN_APP_HWF_REFERENCE_NUMBER,
  GEN_APP_HWF_REFERENCE_NUMBER_INPUT,
  GEN_APP_INTERRUPTION,
  GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED,
  GEN_APP_PARTNER_INFORMATION_CORRECT,
  GEN_APP_SELECT_APPLICATION_TYPE,
  GEN_APP_UPDATE_PARTNER_INFORMATION,
  GEN_APP_UPLOAD_EVIDENCE,
  GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES,
  GEN_APP_WANT_TO_UPLOAD_EVIDENCE,
  GEN_APP_WHY_THIS_APPLICATION,
  MAKE_AN_APPLICATION,
  PAY_YOUR_GENERAL_APPLICATION_FEE,
} from './urls';

export const generalApplicationD11Sequence: Step[] = [
  {
    url: MAKE_AN_APPLICATION,
    getNextStep: () => GEN_APP_INTERRUPTION,
  },
  {
    url: GEN_APP_INTERRUPTION,
    getNextStep: () => GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED,
  },
  {
    url: GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED,
    getNextStep: (data) =>
      data.applicant1GenAppHearingNotRequired ===
        GeneralApplicationHearingNotRequired.YES_PARTNER_AGREES_WITH_APPLICATION ||
      data.applicant1GenAppHearingNotRequired ===
        GeneralApplicationHearingNotRequired.YES_PARTNER_AGREES_WITH_NO_HEARING
        ? GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES
        : GEN_APP_COST_OF_APPLICATION,
  },
  {
    url: GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES,
    getNextStep: () => GEN_APP_COST_OF_APPLICATION,
  },
  {
    url: GEN_APP_COST_OF_APPLICATION,
    getNextStep: data =>
      data.applicant2AddressPrivate === YesOrNo.YES
        ? GEN_APP_SELECT_APPLICATION_TYPE
        : GEN_APP_PARTNER_INFORMATION_CORRECT,
  },
  {
    url: GEN_APP_PARTNER_INFORMATION_CORRECT,
    getNextStep: data =>
      data.applicant1GenAppPartnerDetailsCorrect === YesOrNo.YES
        ? GEN_APP_SELECT_APPLICATION_TYPE
        : GEN_APP_UPDATE_PARTNER_INFORMATION,
  },
  {
    url: GEN_APP_UPDATE_PARTNER_INFORMATION,
    getNextStep: () => GEN_APP_SELECT_APPLICATION_TYPE,
  },
  {
    url: GEN_APP_SELECT_APPLICATION_TYPE,
    getNextStep: () => GEN_APP_WHY_THIS_APPLICATION,
  },
  {
    url: GEN_APP_WHY_THIS_APPLICATION,
    getNextStep: () => GEN_APP_WANT_TO_UPLOAD_EVIDENCE,
  },
  {
    url: GEN_APP_WANT_TO_UPLOAD_EVIDENCE,
    getNextStep: data =>
      data.applicant1InterimAppsCanUploadEvidence === YesOrNo.YES ? GEN_APP_UPLOAD_EVIDENCE : GEN_APP_HELP_WITH_FEES,
  },
  {
    url: GEN_APP_UPLOAD_EVIDENCE,
    getNextStep: () => GEN_APP_HELP_WITH_FEES,
  },
  {
    url: GEN_APP_HELP_WITH_FEES,
    getNextStep: data =>
      data?.applicant1InterimAppsUseHelpWithFees === YesOrNo.YES ? GEN_APP_HWF_REFERENCE_NUMBER : GEN_APP_CHECK_ANSWERS,
  },
  {
    url: GEN_APP_HWF_REFERENCE_NUMBER,
    getNextStep: data =>
      data?.applicant1InterimAppsHaveHwfReference === YesOrNo.YES
        ? GEN_APP_HWF_REFERENCE_NUMBER_INPUT
        : GEN_APP_APPLY_FOR_HWF,
  },
  {
    url: GEN_APP_APPLY_FOR_HWF,
    getNextStep: () => GEN_APP_HWF_REFERENCE_NUMBER_INPUT,
  },
  {
    url: GEN_APP_HWF_REFERENCE_NUMBER_INPUT,
    getNextStep: () => GEN_APP_CHECK_ANSWERS,
  },
  {
    url: GEN_APP_CHECK_ANSWERS,
    getNextStep: data =>
      data?.applicant1GeneralAppServiceRequest
        ? PAY_YOUR_GENERAL_APPLICATION_FEE
        : GENERAL_APPLICATION_SUBMITTED,
  },
];
