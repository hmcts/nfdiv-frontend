import { GeneralApplicationHearingNotRequired, YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import { generalApplicationD11Sequence } from './generalApplicationD11Sequence';
import {
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
} from './urls';

describe('General Application D11 Sequence test', () => {
  describe('MAKE_AN_APPLICATION', () => {
    test('MAKE_AN_APPLICATION', () => {
      const step = generalApplicationD11Sequence.find(obj => obj.url === MAKE_AN_APPLICATION) as Step;
      expect(step.getNextStep({})).toBe(GEN_APP_INTERRUPTION);
    });
  });

  describe('GEN_APP_INTERRUPTION', () => {
    test('GEN_APP_INTERRUPTION', () => {
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_INTERRUPTION) as Step;
      expect(step.getNextStep({})).toBe(GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED);
    });
  });

  describe('GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED', () => {
    test('Partner agrees with application', () => {
      const caseData = {
        applicant1GenAppHearingNotRequired: GeneralApplicationHearingNotRequired.YES_PARTNER_AGREES_WITH_APPLICATION,
      };
      const step = generalApplicationD11Sequence.find(
        obj => obj.url === GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES);
    });

    test('Partner agrees that hearing not required', () => {
      const caseData = {
        applicant1GenAppHearingNotRequired: GeneralApplicationHearingNotRequired.YES_PARTNER_AGREES_WITH_NO_HEARING,
      };
      const step = generalApplicationD11Sequence.find(
        obj => obj.url === GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES);
    });

    test('Application does not need consent', () => {
      const caseData = {
        applicant1GenAppHearingNotRequired: GeneralApplicationHearingNotRequired.YES_DOES_NOT_NEED_CONSENT,
      };
      const step = generalApplicationD11Sequence.find(
        obj => obj.url === GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(GEN_APP_COST_OF_APPLICATION);
    });

    test('Application needs hearing', () => {
      const caseData = {
        applicant1GenAppHearingNotRequired: GeneralApplicationHearingNotRequired.NO,
      };
      const step = generalApplicationD11Sequence.find(
        obj => obj.url === GEN_APP_PARTNER_AGREES_HEARING_NOT_REQUIRED
      ) as Step;
      expect(step.getNextStep(caseData)).toBe(GEN_APP_COST_OF_APPLICATION);
    });
  });

  describe('GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES', () => {
    test('GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES', () => {
      const step = generalApplicationD11Sequence.find(
        obj => obj.url === GEN_APP_UPLOAD_EVIDENCE_PARTNER_AGREES
      ) as Step;
      expect(step.getNextStep({})).toBe(GEN_APP_COST_OF_APPLICATION);
    });
  });

  describe('GEN_APP_COST_OF_APPLICATION', () => {
    test('Partner address is private', () => {
      const caseData = {
        applicant2AddressPrivate: YesOrNo.YES,
      };
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_COST_OF_APPLICATION) as Step;
      expect(step.getNextStep(caseData)).toBe(GEN_APP_SELECT_APPLICATION_TYPE);
    });

    test('Partner address is not private', () => {
      const caseData = {
        applicant2AddressPrivate: YesOrNo.NO,
      };
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_COST_OF_APPLICATION) as Step;
      expect(step.getNextStep(caseData)).toBe(GEN_APP_PARTNER_INFORMATION_CORRECT);
    });
  });

  describe('GEN_APP_PARTNER_INFORMATION_CORRECT', () => {
    test('Partner information correct', () => {
      const caseData = {
        applicant1GenAppPartnerDetailsCorrect: YesOrNo.YES,
      };
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_PARTNER_INFORMATION_CORRECT) as Step;
      expect(step.getNextStep(caseData)).toBe(GEN_APP_SELECT_APPLICATION_TYPE);
    });

    test('Partner information not correct', () => {
      const caseData = {
        applicant1GenAppPartnerDetailsCorrect: YesOrNo.NO,
      };
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_PARTNER_INFORMATION_CORRECT) as Step;
      expect(step.getNextStep(caseData)).toBe(GEN_APP_UPDATE_PARTNER_INFORMATION);
    });
  });

  describe('GEN_APP_UPDATE_PARTNER_INFORMATION', () => {
    test('GEN_APP_UPDATE_PARTNER_INFORMATION', () => {
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_UPDATE_PARTNER_INFORMATION) as Step;
      expect(step.getNextStep({})).toBe(GEN_APP_SELECT_APPLICATION_TYPE);
    });
  });

  describe('GEN_APP_SELECT_APPLICATION_TYPE', () => {
    test('GEN_APP_SELECT_APPLICATION_TYPE', () => {
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_SELECT_APPLICATION_TYPE) as Step;
      expect(step.getNextStep({})).toBe(GEN_APP_WHY_THIS_APPLICATION);
    });
  });

  describe('GEN_APP_WHY_THIS_APPLICATION', () => {
    test('GEN_APP_WHY_THIS_APPLICATION', () => {
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_WHY_THIS_APPLICATION) as Step;
      expect(step.getNextStep({})).toBe(GEN_APP_WANT_TO_UPLOAD_EVIDENCE);
    });
  });

  describe('GEN_APP_WANT_TO_UPLOAD_EVIDENCE', () => {
    test('Have Evidence', () => {
      const caseData = {
        applicant1InterimAppsCanUploadEvidence: YesOrNo.YES,
      };
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_WANT_TO_UPLOAD_EVIDENCE) as Step;
      expect(step.getNextStep(caseData)).toBe(GEN_APP_UPLOAD_EVIDENCE);
    });

    test('Do not have Evidence', () => {
      const caseData = {
        applicant1InterimAppsCanUploadEvidence: YesOrNo.NO,
      };
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_WANT_TO_UPLOAD_EVIDENCE) as Step;
      expect(step.getNextStep(caseData)).toBe(GEN_APP_HELP_WITH_FEES);
    });
  });

  describe('GEN_APP_UPLOAD_EVIDENCE', () => {
    test('GEN_APP_UPLOAD_EVIDENCE', () => {
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_UPLOAD_EVIDENCE) as Step;
      expect(step.getNextStep({})).toBe(GEN_APP_HELP_WITH_FEES);
    });
  });

  describe('GEN_APP_HELP_WITH_FEES', () => {
    test('Use HWF', () => {
      const caseData = {
        applicant1InterimAppsUseHelpWithFees: YesOrNo.YES,
      };
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_HELP_WITH_FEES) as Step;
      expect(step.getNextStep(caseData)).toBe(GEN_APP_HWF_REFERENCE_NUMBER);
    });

    test('Do not Use HWF', () => {
      const caseData = {
        applicant1InterimAppsUseHelpWithFees: YesOrNo.NO,
      };
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_HELP_WITH_FEES) as Step;
      expect(step.getNextStep(caseData)).toBe(GEN_APP_CHECK_ANSWERS);
    });
  });

  describe('GEN_APP_HWF_REFERENCE_NUMBER', () => {
    test('Have HWF Ref', () => {
      const caseData = {
        applicant1InterimAppsHaveHwfReference: YesOrNo.YES,
      };
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_HWF_REFERENCE_NUMBER) as Step;
      expect(step.getNextStep(caseData)).toBe(GEN_APP_HWF_REFERENCE_NUMBER_INPUT);
    });

    test('Do not have HWF Ref', () => {
      const caseData = {
        applicant1InterimAppsHaveHwfReference: YesOrNo.NO,
      };
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_HWF_REFERENCE_NUMBER) as Step;
      expect(step.getNextStep(caseData)).toBe(GEN_APP_APPLY_FOR_HWF);
    });
  });

  describe('GEN_APP_HWF_REFERENCE_NUMBER_INPUT', () => {
    test('GEN_APP_HWF_REFERENCE_NUMBER_INPUT', () => {
      const step = generalApplicationD11Sequence.find(obj => obj.url === GEN_APP_HWF_REFERENCE_NUMBER_INPUT) as Step;
      expect(step.getNextStep({})).toBe(GEN_APP_CHECK_ANSWERS);
    });
  });
});
