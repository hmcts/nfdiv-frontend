import { YesOrNo, YesOrNoOrNotKnown } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { bailiffServiceApplicationSequence } from './bailiffServiceApplicationSequence';
import {
  ABLE_TO_UPLOAD_PARTNER_PHOTO,
  APPLY_FOR_HWF_BAILIFF,
  ARE_THERE_DANGEROUS_ANIMALS,
  BAILIFF_SERVICE_APPLICATION,
  CHECK_ANSWERS_BAILIFF,
  DOES_PARTNER_HAVE_A_VEHICLE,
  ENTER_PARTNERS_NAME_BAILIFF,
  HAS_PARTNER_BEEN_VIOLENT,
  HAS_PARTNER_MADE_THREATS,
  HAVE_POLICE_BEEN_INVOLVED,
  HAVE_SOCIAL_SERVICES_BEEN_INVOLVED,
  HELP_WITH_FEES_BAILIFF,
  HWF_REFERENCE_NUMBER_BAILIFF,
  HWF_REFERENCE_NUMBER_INPUT_BAILIFF,
  PARTNER_ADDRESS_BAILIFF,
  PARTNER_DATE_OF_BIRTH_BAILIFF,
  PARTNER_DISTINGUISHING_FEATURES_BAILIFF,
  PARTNER_ETHNIC_GROUP_BAILIFF,
  PARTNER_EYE_COLOUR_BAILIFF,
  PARTNER_FIREARMS_LICENSE_BAILIFF,
  PARTNER_HAIR_COLOUR_BAILIFF,
  PARTNER_HEIGHT_BAILIFF,
  PARTNER_IN_REFUGE_BAILIFF,
  PARTNER_MENTAL_HEALTH_BAILIFF,
  PARTNER_PHONE_NUMBER_BAILIFF,
  PARTNER_VEHICLE_DETAILS,
  PAY_YOUR_SERVICE_FEE,
  SERVICE_APPLICATION_SUBMITTED,
  UPLOAD_PARTNER_PHOTO,
  WHEN_IS_BEST_TO_SERVE,
} from './urls';

describe('Bailiff Service Application Sequence test', () => {
  describe('BAILIFF_SERVICE_APPLICATION', () => {
    test('BAILIFF_SERVICE_APPLICATION', () => {
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === BAILIFF_SERVICE_APPLICATION) as Step;
      expect(step.getNextStep({})).toBe(HELP_WITH_FEES_BAILIFF);
    });
  });

  describe('HELP_WITH_FEES_BAILIFF', () => {
    test('Use HWF', () => {
      const caseData = {
        applicant1InterimAppsUseHelpWithFees: YesOrNo.YES,
      };
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === HELP_WITH_FEES_BAILIFF) as Step;
      expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_BAILIFF);
    });

    test('Do not Use HWF', () => {
      const caseData = {
        applicant1InterimAppsUseHelpWithFees: YesOrNo.NO,
      };
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === HELP_WITH_FEES_BAILIFF) as Step;
      expect(step.getNextStep(caseData)).toBe(ENTER_PARTNERS_NAME_BAILIFF);
    });
  });

  describe('HWF_REFERENCE_NUMBER_BAILIFF', () => {
    test('Have HWF Ref', () => {
      const caseData = {
        applicant1InterimAppsHaveHwfReference: YesOrNo.YES,
      };
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === HWF_REFERENCE_NUMBER_BAILIFF) as Step;
      expect(step.getNextStep(caseData)).toBe(HWF_REFERENCE_NUMBER_INPUT_BAILIFF);
    });

    test('Do not have HWF Ref', () => {
      const caseData = {
        applicant1InterimAppsHaveHwfReference: YesOrNo.NO,
      };
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === HWF_REFERENCE_NUMBER_BAILIFF) as Step;
      expect(step.getNextStep(caseData)).toBe(APPLY_FOR_HWF_BAILIFF);
    });
  });

  test('HWF_REFERENCE_NUMBER_INPUT_BAILIFF redirects to ENTER_PARTNERS_NAME_BAILIFF', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === HWF_REFERENCE_NUMBER_INPUT_BAILIFF) as Step;
    expect(step.getNextStep({})).toBe(ENTER_PARTNERS_NAME_BAILIFF);
  });

  test('BAILIFF_SERVICE_APPLICATION redirects to ENTER_PARTNERS_NAME_BAILIFF', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === BAILIFF_SERVICE_APPLICATION) as Step;
    expect(step.getNextStep({})).toBe(HELP_WITH_FEES_BAILIFF);
  });

  test('ENTER_PARTNERS_NAME_BAILIFF redirects to PARTNER_IN_REFUGE_BAILIFF', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === ENTER_PARTNERS_NAME_BAILIFF) as Step;
    expect(step.getNextStep({})).toBe(PARTNER_IN_REFUGE_BAILIFF);
  });

  test('PARTNER_IN_REFUGE_BAILIFF redirects to PARTNER_ADDRESS_BAILIFF', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === PARTNER_IN_REFUGE_BAILIFF) as Step;
    expect(step.getNextStep({})).toBe(PARTNER_ADDRESS_BAILIFF);
  });

  test('PARTNER_ADDRESS_BAILIFF redirects to PARTNER_PHONE_NUMBER_BAILIFF', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === PARTNER_ADDRESS_BAILIFF) as Step;
    expect(step.getNextStep({})).toBe(PARTNER_PHONE_NUMBER_BAILIFF);
  });

  test('PARTNER_PHONE_NUMBER_BAILIFF redirects to PARTNER_DATE_OF_BIRTH_BAILIFF', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === PARTNER_PHONE_NUMBER_BAILIFF) as Step;
    expect(step.getNextStep({})).toBe(PARTNER_DATE_OF_BIRTH_BAILIFF);
  });

  test('PARTNER_DATE_OF_BIRTH_BAILIFF redirects to PARTNER_HEIGHT_BAILIFF', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === PARTNER_DATE_OF_BIRTH_BAILIFF) as Step;
    expect(step.getNextStep({})).toBe(PARTNER_HEIGHT_BAILIFF);
  });

  test('PARTNER_HEIGHT_BAILIFF redirects to PARTNER_HAIR_COLOUR_BAILIFF', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === PARTNER_HEIGHT_BAILIFF) as Step;
    expect(step.getNextStep({})).toBe(PARTNER_HAIR_COLOUR_BAILIFF);
  });

  test('PARTNER_HAIR_COLOUR_BAILIFF redirects to PARTNER_EYE_COLOUR_BAILIFF', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === PARTNER_HAIR_COLOUR_BAILIFF) as Step;
    expect(step.getNextStep({})).toBe(PARTNER_EYE_COLOUR_BAILIFF);
  });

  test('PARTNER_EYE_COLOUR_BAILIFF redirects to PARTNER_ETHNIC_GROUP_BAILIFF', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === PARTNER_EYE_COLOUR_BAILIFF) as Step;
    expect(step.getNextStep({})).toBe(PARTNER_ETHNIC_GROUP_BAILIFF);
  });

  test('PARTNER_ETHNIC_GROUP_BAILIFF redirects to PARTNER_DISTINGUISHING_FEATURES_BAILIFF', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === PARTNER_ETHNIC_GROUP_BAILIFF) as Step;
    expect(step.getNextStep({})).toBe(PARTNER_DISTINGUISHING_FEATURES_BAILIFF);
  });

  test('PARTNER_DISTINGUISHING_FEATURES_BAILIFF redirects to ABLE_TO_UPLOAD_PARTNER_PHOTO', () => {
    const step = bailiffServiceApplicationSequence.find(
      obj => obj.url === PARTNER_DISTINGUISHING_FEATURES_BAILIFF
    ) as Step;
    expect(step.getNextStep({})).toBe(ABLE_TO_UPLOAD_PARTNER_PHOTO);
  });

  describe('ABLE_TO_UPLOAD_PARTNER_PHOTO', () => {
    test('redirects to UPLOAD_PARTNER_PHOTO if able to upload', () => {
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === ABLE_TO_UPLOAD_PARTNER_PHOTO) as Step;
      expect(
        step.getNextStep({
          applicant1InterimAppsCanUploadEvidence: YesOrNo.YES,
        })
      ).toBe(UPLOAD_PARTNER_PHOTO);
    });

    test('redirects to WHEN_IS_BEST_TO_SERVE if not able to upload', () => {
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === ABLE_TO_UPLOAD_PARTNER_PHOTO) as Step;
      expect(
        step.getNextStep({
          applicant1InterimAppsCanUploadEvidence: YesOrNo.NO,
        })
      ).toBe(WHEN_IS_BEST_TO_SERVE);
    });
  });

  test('UPLOAD_PARTNER_PHOTO redirects to WHEN_IS_BEST_TO_SERVE', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === UPLOAD_PARTNER_PHOTO) as Step;
    expect(step.getNextStep({})).toBe(WHEN_IS_BEST_TO_SERVE);
  });

  test('WHEN_IS_BEST_TO_SERVE redirects to DOES_PARTNER_HAVE_A_VEHICLE', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === WHEN_IS_BEST_TO_SERVE) as Step;
    expect(step.getNextStep({})).toBe(DOES_PARTNER_HAVE_A_VEHICLE);
  });

  describe('DOES_PARTNER_HAVE_A_VEHICLE', () => {
    test('redirects to PARTNER_VEHICLE_DETAILS if partner has a vehicle', () => {
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === DOES_PARTNER_HAVE_A_VEHICLE) as Step;
      expect(
        step.getNextStep({
          applicant1BailiffDoesPartnerHaveVehicle: YesOrNoOrNotKnown.YES,
        })
      ).toBe(PARTNER_VEHICLE_DETAILS);
    });

    test('redirects to HAS_PARTNER_BEEN_VIOLENT if partner does not have a vehicle', () => {
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === DOES_PARTNER_HAVE_A_VEHICLE) as Step;
      expect(
        step.getNextStep({
          applicant1BailiffDoesPartnerHaveVehicle: YesOrNoOrNotKnown.NO,
        })
      ).toBe(HAS_PARTNER_BEEN_VIOLENT);
    });
  });

  test('PARTNER_VEHICLE_DETAILS redirects to HAS_PARTNER_BEEN_VIOLENT', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === PARTNER_VEHICLE_DETAILS) as Step;
    expect(step.getNextStep({})).toBe(HAS_PARTNER_BEEN_VIOLENT);
  });

  test('HAS_PARTNER_BEEN_VIOLENT redirects to HAS_PARTNER_MADE_THREATS', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === HAS_PARTNER_BEEN_VIOLENT) as Step;
    expect(step.getNextStep({})).toBe(HAS_PARTNER_MADE_THREATS);
  });

  test('HAS_PARTNER_MADE_THREATS redirects to HAVE_POLICE_BEEN_INVOLVED', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === HAS_PARTNER_MADE_THREATS) as Step;
    expect(step.getNextStep({})).toBe(HAVE_POLICE_BEEN_INVOLVED);
  });

  test('HAVE_POLICE_BEEN_INVOLVED redirects to HAVE_SOCIAL_SERVICES_BEEN_INVOLVED', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === HAVE_POLICE_BEEN_INVOLVED) as Step;
    expect(step.getNextStep({})).toBe(HAVE_SOCIAL_SERVICES_BEEN_INVOLVED);
  });

  test('HAVE_SOCIAL_SERVICES_BEEN_INVOLVED redirects to ARE_THERE_DANGEROUS_ANIMALS', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === HAVE_SOCIAL_SERVICES_BEEN_INVOLVED) as Step;
    expect(step.getNextStep({})).toBe(ARE_THERE_DANGEROUS_ANIMALS);
  });

  test('ARE_THERE_DANGEROUS_ANIMALS redirects to PARTNER_MENTAL_HEALTH_BAILIFF', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === ARE_THERE_DANGEROUS_ANIMALS) as Step;
    expect(step.getNextStep({})).toBe(PARTNER_MENTAL_HEALTH_BAILIFF);
  });

  test('PARTNER_MENTAL_HEALTH_BAILIFF redirects to PARTNER_FIREARMS_LICENSE_BAILIFF', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === PARTNER_MENTAL_HEALTH_BAILIFF) as Step;
    expect(step.getNextStep({})).toBe(PARTNER_FIREARMS_LICENSE_BAILIFF);
  });

  test('PARTNER_FIREARMS_LICENSE_BAILIFF redirects to CHECK_ANSWERS_BAILIFF', () => {
    const step = bailiffServiceApplicationSequence.find(obj => obj.url === PARTNER_FIREARMS_LICENSE_BAILIFF) as Step;
    expect(step.getNextStep({})).toBe(CHECK_ANSWERS_BAILIFF);
  });

  describe('CHECK_ANSWERS_BAILIFF', () => {
    test('redirects to PAY_YOUR_SERVICE_FEE if alternativeServiceFeeRequired is YES', () => {
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === CHECK_ANSWERS_BAILIFF) as Step;
      expect(
        step.getNextStep({
          alternativeServiceFeeRequired: YesOrNo.YES,
        })
      ).toBe(PAY_YOUR_SERVICE_FEE);
    });

    test('redirects to SERVICE_APPLICATION_SUBMITTED if alternativeServiceFeeRequired is NO', () => {
      const step = bailiffServiceApplicationSequence.find(obj => obj.url === CHECK_ANSWERS_BAILIFF) as Step;
      expect(
        step.getNextStep({
          alternativeServiceFeeRequired: YesOrNo.NO,
        })
      ).toBe(SERVICE_APPLICATION_SUBMITTED);
    });
  });
});
