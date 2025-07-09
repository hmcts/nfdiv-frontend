import { YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { bailiffServiceApplicationSequence } from './bailiffServiceApplicationSequence';
import {
  APPLY_FOR_HWF_BAILIFF,
  BAILIFF_SERVICE_APPLICATION,
  ENTER_PARTNERS_NAME_BAILIFF,
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

  test('PARTNER_DISTINGUISHING_FEATURES_BAILIFF redirects to BAILIFF_SERVICE_APPLICATION', () => {
    const step = bailiffServiceApplicationSequence.find(
      obj => obj.url === PARTNER_DISTINGUISHING_FEATURES_BAILIFF
    ) as Step;
    expect(step.getNextStep({})).toBe(BAILIFF_SERVICE_APPLICATION);
  });
});
