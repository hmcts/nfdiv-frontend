import {
  GeneralApplicationHearingNotRequired,
  GeneralApplicationType,
  WhichApplicant,
  YesOrNo,
} from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  GENERAL_APPLICATION_SUBMITTED,
  GEN_APP_APPLICATION_WITHDRAWN,
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
  GEN_APP_WITHDRAW_APPLICATION,
  HOME_URL,
  MAKE_AN_APPLICATION,
  MAKE_AN_OFFLINE_APPLICATION,
  PAY_YOUR_GENERAL_APPLICATION_FEE,
  WITHDRAW_THIS_APPLICATION_POST_ISSUE,
} from './urls';

export const generalApplicationD11Sequence = (party: WhichApplicant): Step[] => {
  const isApplicant1 = party === WhichApplicant.APPLICANT_1;
  return [
    {
      url: MAKE_AN_APPLICATION,
      getNextStep: () => GEN_APP_INTERRUPTION,
    },
    {
      url: WITHDRAW_THIS_APPLICATION_POST_ISSUE,
      getNextStep: () => GEN_APP_INTERRUPTION,
    },
    {
      url: GEN_APP_INTERRUPTION,
      getNextStep: () => GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED,
    },
    {
      url: GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED,
      getNextStep: data => {
        const hearingNotRequiredAnswer = isApplicant1
          ? data.applicant1GenAppHearingNotRequired
          : data.applicant2GenAppHearingNotRequired;

        return [
          GeneralApplicationHearingNotRequired.YES_PARTNER_AGREES_WITH_APPLICATION,
          GeneralApplicationHearingNotRequired.YES_PARTNER_AGREES_WITH_NO_HEARING,
        ].includes(hearingNotRequiredAnswer as GeneralApplicationHearingNotRequired)
          ? GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES
          : GEN_APP_COST_OF_APPLICATION;
      },
    },
    {
      url: GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES,
      getNextStep: () => GEN_APP_COST_OF_APPLICATION,
    },
    {
      url: GEN_APP_COST_OF_APPLICATION,
      getNextStep: data => {
        const partnerDetailsArePrivate = isApplicant1 ? data.applicant2AddressPrivate : data.applicant1AddressPrivate;
        const generalApplicationType = isApplicant1 ? data.applicant1GenAppType : data.applicant2GenAppType;

        return partnerDetailsArePrivate === YesOrNo.YES
          ? generalApplicationType === GeneralApplicationType.WITHDRAW_POST_ISSUE
            ? GEN_APP_WHY_THIS_APPLICATION
            : GEN_APP_SELECT_APPLICATION_TYPE
          : GEN_APP_PARTNER_INFORMATION_CORRECT;
      },
    },
    {
      url: GEN_APP_PARTNER_INFORMATION_CORRECT,
      getNextStep: data => {
        const partnerDetailsAreCorrect = isApplicant1
          ? data.applicant1GenAppPartnerDetailsCorrect
          : data.applicant2GenAppPartnerDetailsCorrect;
        const generalApplicationType = isApplicant1 ? data.applicant1GenAppType : data.applicant2GenAppType;

        return partnerDetailsAreCorrect === YesOrNo.YES
          ? generalApplicationType === GeneralApplicationType.WITHDRAW_POST_ISSUE
            ? GEN_APP_WHY_THIS_APPLICATION
            : GEN_APP_SELECT_APPLICATION_TYPE
          : GEN_APP_UPDATE_PARTNER_INFORMATION;
      },
    },
    {
      url: GEN_APP_UPDATE_PARTNER_INFORMATION,
      getNextStep: data => {
        const generalApplicationType = isApplicant1 ? data.applicant1GenAppType : data.applicant2GenAppType;

        return generalApplicationType === GeneralApplicationType.WITHDRAW_POST_ISSUE
          ? GEN_APP_WHY_THIS_APPLICATION
          : GEN_APP_SELECT_APPLICATION_TYPE;
      },
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
      getNextStep: data => {
        const wantToUploadEvidenceAnswer = isApplicant1
          ? data.applicant1InterimAppsCanUploadEvidence
          : data.applicant2InterimAppsCanUploadEvidence;
        return wantToUploadEvidenceAnswer === YesOrNo.YES ? GEN_APP_UPLOAD_EVIDENCE : GEN_APP_HELP_WITH_FEES;
      },
    },
    {
      url: GEN_APP_UPLOAD_EVIDENCE,
      getNextStep: () => GEN_APP_HELP_WITH_FEES,
    },
    {
      url: GEN_APP_HELP_WITH_FEES,
      getNextStep: data => {
        const useHelpWithFeesAnswer = isApplicant1
          ? data.applicant1InterimAppsUseHelpWithFees
          : data.applicant2InterimAppsUseHelpWithFees;
        return useHelpWithFeesAnswer === YesOrNo.YES ? GEN_APP_HWF_REFERENCE_NUMBER : GEN_APP_CHECK_ANSWERS;
      },
    },
    {
      url: GEN_APP_HWF_REFERENCE_NUMBER,
      getNextStep: data => {
        const haveHwfReferenceAnswer = isApplicant1
          ? data.applicant1InterimAppsHaveHwfReference
          : data.applicant2InterimAppsHaveHwfReference;
        return haveHwfReferenceAnswer === YesOrNo.YES ? GEN_APP_HWF_REFERENCE_NUMBER_INPUT : GEN_APP_APPLY_FOR_HWF;
      },
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
      getNextStep: data => {
        const generalAppServiceRequest = isApplicant1
          ? data.applicant1GeneralAppServiceRequest
          : data.applicant2GeneralAppServiceRequest;
        return generalAppServiceRequest ? PAY_YOUR_GENERAL_APPLICATION_FEE : GENERAL_APPLICATION_SUBMITTED;
      },
    },
  ];
};

export const generalApplicationOtherSequence: Step[] = [
  {
    url: MAKE_AN_OFFLINE_APPLICATION,
    getNextStep: () => HOME_URL,
  },
  {
    url: GEN_APP_WITHDRAW_APPLICATION,
    getNextStep: () => GEN_APP_APPLICATION_WITHDRAWN,
  },
  {
    url: GEN_APP_APPLICATION_WITHDRAWN,
    getNextStep: () => HOME_URL,
  },
];
