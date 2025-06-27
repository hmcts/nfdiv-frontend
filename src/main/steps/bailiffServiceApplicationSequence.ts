import { YesOrNo, YesOrNoOrNotKnown } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  ABLE_TO_UPLOAD_PARTNER_PHOTO,
  APPLY_FOR_HWF_BAILIFF,
  BAILIFF_SERVICE_APPLICATION,
  DOES_PARTNER_HAVE_A_VEHICLE,
  ENTER_PARTNERS_NAME_BAILIFF,
  HAS_PARTNER_BEEN_VIOLENT,
  HELP_WITH_FEES_BAILIFF,
  HWF_REFERENCE_NUMBER_BAILIFF,
  HWF_REFERENCE_NUMBER_INPUT_BAILIFF,
  PARTNER_ADDRESS_BAILIFF,
  PARTNER_DATE_OF_BIRTH_BAILIFF,
  PARTNER_DISTINGUISHING_FEATURES_BAILIFF,
  PARTNER_ETHNIC_GROUP_BAILIFF,
  PARTNER_EYE_COLOUR_BAILIFF,
  PARTNER_HAIR_COLOUR_BAILIFF,
  PARTNER_HEIGHT_BAILIFF,
  PARTNER_IN_REFUGE_BAILIFF,
  PARTNER_PHONE_NUMBER_BAILIFF,
  PARTNER_VEHICLE_DETAILS,
  UPLOAD_PARTNER_PHOTO,
  WHEN_IS_BEST_TO_SERVE,
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
    getNextStep: data =>
      data?.applicant1BailiffPartnerInARefuge === YesOrNoOrNotKnown.YES
        ? PARTNER_PHONE_NUMBER_BAILIFF
        : PARTNER_ADDRESS_BAILIFF,
  },
  {
    url: PARTNER_ADDRESS_BAILIFF,
    getNextStep: () => PARTNER_PHONE_NUMBER_BAILIFF,
  },
  {
    url: PARTNER_PHONE_NUMBER_BAILIFF,
    getNextStep: () => PARTNER_DATE_OF_BIRTH_BAILIFF,
  },
  {
    url: PARTNER_DATE_OF_BIRTH_BAILIFF,
    getNextStep: () => PARTNER_HEIGHT_BAILIFF,
  },
  {
    url: PARTNER_HEIGHT_BAILIFF,
    getNextStep: () => PARTNER_HAIR_COLOUR_BAILIFF,
  },
  {
    url: PARTNER_HAIR_COLOUR_BAILIFF,
    getNextStep: () => PARTNER_EYE_COLOUR_BAILIFF,
  },
  {
    url: PARTNER_EYE_COLOUR_BAILIFF,
    getNextStep: () => PARTNER_ETHNIC_GROUP_BAILIFF,
  },
  {
    url: PARTNER_ETHNIC_GROUP_BAILIFF,
    getNextStep: () => PARTNER_DISTINGUISHING_FEATURES_BAILIFF,
  },
  {
    url: PARTNER_DISTINGUISHING_FEATURES_BAILIFF,
    getNextStep: () => ABLE_TO_UPLOAD_PARTNER_PHOTO,
  },
  {
    url: ABLE_TO_UPLOAD_PARTNER_PHOTO,
    getNextStep: data =>
      data.applicant1InterimAppsCanUploadEvidence === YesOrNo.YES ? UPLOAD_PARTNER_PHOTO : WHEN_IS_BEST_TO_SERVE,
  },
  {
    url: UPLOAD_PARTNER_PHOTO,
    getNextStep: () => WHEN_IS_BEST_TO_SERVE,
  },
  {
    url: WHEN_IS_BEST_TO_SERVE,
    getNextStep: () => DOES_PARTNER_HAVE_A_VEHICLE,
  },
  {
    url: DOES_PARTNER_HAVE_A_VEHICLE,
    getNextStep: data =>
      data?.applicant1BailiffDoesPartnerHaveVehicle === YesOrNoOrNotKnown.YES
        ? PARTNER_VEHICLE_DETAILS
        : HAS_PARTNER_BEEN_VIOLENT,
  },
  {
    url: PARTNER_VEHICLE_DETAILS,
    getNextStep: () => HAS_PARTNER_BEEN_VIOLENT,
  },
  {
    url: HAS_PARTNER_BEEN_VIOLENT,
    getNextStep: () => BAILIFF_SERVICE_APPLICATION,
  },
];
