import { AlternativeServiceMethod, YesOrNo } from '../app/case/definition';

import { Step } from './applicant1Sequence';
import {
  ALTERNATIVE_EXPLAIN_SERVE_DOCUMENTS,
  ALTERNATIVE_HOW_TO_SERVE,
  ALTERNATIVE_INTERRUPTION,
  ALTERNATIVE_SENDING_PAPERS_TO_PARTNER,
  ALTERNATIVE_SERVICE_APPLICATION,
  ALTERNATIVE_WHY_APPLY_THIS_WAY,
  APPLY_FOR_HWF_ALTERNATIVE,
  CHECK_ANSWERS_ALTERNATIVE,
  HELP_WITH_FEES_ALTERNATIVE,
  HUB_PAGE,
  HWF_REFERENCE_NUMBER_ALTERNATIVE,
  HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE,
  UPLOAD_EVIDENCE_ALTERNATIVE,
  WANT_UPLOAD_EVIDENCE_ALTERNATIVE,
} from './urls';

export const alternativeServiceApplicationSequence: Step[] = [
  {
    url: ALTERNATIVE_SERVICE_APPLICATION,
    getNextStep: () => ALTERNATIVE_INTERRUPTION,
  },
  {
    url: ALTERNATIVE_INTERRUPTION,
    getNextStep: () => HELP_WITH_FEES_ALTERNATIVE,
  },
  {
    url: HELP_WITH_FEES_ALTERNATIVE,
    getNextStep: data =>
      data?.applicant1InterimAppsUseHelpWithFees === YesOrNo.YES
        ? HWF_REFERENCE_NUMBER_ALTERNATIVE
        : ALTERNATIVE_EXPLAIN_SERVE_DOCUMENTS,
  },
  {
    url: HWF_REFERENCE_NUMBER_ALTERNATIVE,
    getNextStep: data =>
      data?.applicant1InterimAppsHaveHwfReference === YesOrNo.YES
        ? HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE
        : APPLY_FOR_HWF_ALTERNATIVE,
  },
  {
    url: HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE,
    getNextStep: () => ALTERNATIVE_EXPLAIN_SERVE_DOCUMENTS,
  },
  {
    url: APPLY_FOR_HWF_ALTERNATIVE,
    getNextStep: () => HWF_REFERENCE_NUMBER_INPUT_ALTERNATIVE,
  },
  {
    url: ALTERNATIVE_EXPLAIN_SERVE_DOCUMENTS,
    getNextStep: () => ALTERNATIVE_SENDING_PAPERS_TO_PARTNER,
  },
  {
    url: ALTERNATIVE_SENDING_PAPERS_TO_PARTNER,
    getNextStep: data =>
      data?.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL
        ? WANT_UPLOAD_EVIDENCE_ALTERNATIVE
        : ALTERNATIVE_HOW_TO_SERVE,
  },
  {
    url: ALTERNATIVE_HOW_TO_SERVE,
    getNextStep: () => WANT_UPLOAD_EVIDENCE_ALTERNATIVE,
  },
  {
    url: WANT_UPLOAD_EVIDENCE_ALTERNATIVE,
    getNextStep: data =>
      data?.applicant1InterimAppsCanUploadEvidence === YesOrNo.YES
        ? UPLOAD_EVIDENCE_ALTERNATIVE
        : ALTERNATIVE_WHY_APPLY_THIS_WAY,
  },
  {
    url: UPLOAD_EVIDENCE_ALTERNATIVE,
    getNextStep: () => ALTERNATIVE_WHY_APPLY_THIS_WAY,
  },
  {
    url: ALTERNATIVE_WHY_APPLY_THIS_WAY,
    getNextStep: () => CHECK_ANSWERS_ALTERNATIVE,
  },
  {
    url: CHECK_ANSWERS_ALTERNATIVE,
    getNextStep: () => HUB_PAGE, // Correct this when the rest of the journey is implemented
  },
];
