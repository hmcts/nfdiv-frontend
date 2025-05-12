import { Checkbox } from '../../../../../app/case/case';
import { YesOrNo } from '../../../../../app/case/definition';
import { getFilename } from '../../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import * as urls from '../../../../urls';
import {
  form as checkAnswersForm,
  generateContent as checkAnswersGenerateContent,
} from '../../common/check-answers/content';

const en = (
  useHwf,
  haveHwfReference,
  hwfReference,
  canUpload,
  uploadedDocsFilenames,
  evidenceDetails,
  noEvidenceStatement,
) => ({
  stepQuestions: {
    useHwf: 'Use Help With Fees',
    haveHwfReference: 'I have an HWF Reference',
    hwfReference: 'HWF Reference',
    canUploadEvidence: 'I can upload evidence',
    uploadedFiles: 'Uploaded files',
    evidenceDetails: 'Details',
    noEvidenceStatement: 'No Evidence Statement',
  },
  stepAnswers: {
    useHwf: `${useHwf}`,
    haveHwfReference: `${haveHwfReference}`,
    hwfReference: `${hwfReference}`,
    canUploadEvidence: `${canUpload}`,
    uploadedFiles: `${uploadedDocsFilenames}`,
    evidenceDetails: `${evidenceDetails}`,
    noEvidenceStatement: `${noEvidenceStatement}`,
  },
  stepLinks: {
    useHwf: `${urls.HELP_WITH_FEES_DEEMED}`,
    haveHwfReference: `${urls.HWF_REFERENCE_NUMBER_DEEMED}`,
    hwfReference: `${urls.HWF_REFERENCE_NUMBER_INPUT_DEEMED}`,
    canUploadEvidence: `${urls.WANT_UPLOAD_EVIDENCE_DEEMED}`,
    uploadedFiles: `${urls.UPLOAD_EVIDENCE_DEEMED}`,
    evidenceDetails: `${urls.HOW_DO_YOU_KNOW_DEEMED}`,
    noEvidenceStatement: `${urls.WHY_NO_EVIDENCE_DEEMED}`,
  },
});

const cy: typeof en = (
  useHwf,
  haveHwfReference,
  hwfReference,
  canUpload,
  uploadedDocsFilenames,
  evidenceDetails,
  noEvidenceStatement,
) => ({
  stepQuestions: {
    useHwf: 'Use Help With Fees',
    haveHwfReference: 'I have an HWF Reference',
    hwfReference: 'HWF Reference',
    canUploadEvidence: 'I can upload evidence',
    uploadedFiles: 'Uploaded files',
    evidenceDetails: 'Details',
    noEvidenceStatement: 'No Evidence Statement',
  },
  stepAnswers: {
    useHwf: `${useHwf}`,
    haveHwfReference: `${haveHwfReference}`,
    hwfReference: `${hwfReference}`,
    canUploadEvidence: `${canUpload}`,
    uploadedFiles: `${uploadedDocsFilenames}`,
    evidenceDetails: `${evidenceDetails}`,
    noEvidenceStatement: `${noEvidenceStatement}`,
  },
  stepLinks: {
    useHwf: `${urls.HELP_WITH_FEES_DEEMED}`,
    haveHwfReference: `${urls.HWF_REFERENCE_NUMBER_DEEMED}`,
    hwfReference: `${urls.HWF_REFERENCE_NUMBER_INPUT_DEEMED}`,
    canUploadEvidence: `${urls.WANT_UPLOAD_EVIDENCE_DEEMED}`,
    uploadedFiles: `${urls.UPLOAD_EVIDENCE_DEEMED}`,
    evidenceDetails: `${urls.HOW_DO_YOU_KNOW_DEEMED}`,
    noEvidenceStatement: `${urls.WHY_NO_EVIDENCE_DEEMED}`,
  },
});

export const form: FormContent = checkAnswersForm;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const checkAnswersContent = checkAnswersGenerateContent(content);
  const useHwf = content.userCase.applicant1GenAppsUseHelpWithFees;
  const haveHwfReference = content.userCase.applicant1GenAppsHaveHwfReference;
  const hwfReference = content.userCase.applicant1GenAppsHwfRefNumber;
  const canUpload = content.userCase.applicant1GenAppsCanUploadEvidence;
  const uploadedDocsFilenames = content.userCase.applicant1GenAppsEvidenceDocs?.map(item => getFilename(item.value));
  const cannotUploadDocs =
    content.userCase.applicant1GenAppsCannotUploadDocs === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
  const evidenceDetails = content.userCase.applicant1DeemedEvidenceDetails;
  const noEvidenceStatement = content.userCase.applicant1DeemedNoEvidenceStatement;
  const translations = languages[content.language](
    useHwf,
    haveHwfReference,
    hwfReference,
    canUpload,
    uploadedDocsFilenames,
    evidenceDetails,
    noEvidenceStatement,
  );
  return {
    ...checkAnswersContent,
    ...translations,
    form,
    useHwf,
    haveHwfReference,
    hwfReference,
    canUpload,
    uploadedDocsFilenames,
    cannotUploadDocs,
    evidenceDetails,
    noEvidenceStatement,
  };
};
