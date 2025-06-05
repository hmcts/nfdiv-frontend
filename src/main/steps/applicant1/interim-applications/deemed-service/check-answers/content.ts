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

const en = (useHwf, hwfReference, canUpload, uploadedDocsFilenames, evidenceDetails, noEvidenceStatement) => ({
  stepQuestions: {
    useHwf: 'Use Help With Fees',
    hwfReference: 'HWF Reference',
    canUploadEvidence: 'I can upload evidence',
    uploadedFiles: 'Uploaded files',
    evidenceDetails: 'Details',
    noEvidenceStatement: 'No Evidence Statement',
  },
  stepAnswers: {
    useHwf: `${useHwf}`,
    hwfReference: `${hwfReference}`,
    canUploadEvidence: `${canUpload}`,
    uploadedFiles: `${uploadedDocsFilenames}`,
    evidenceDetails: `${evidenceDetails}`,
    noEvidenceStatement: `${noEvidenceStatement}`,
  },
  stepLinks: {
    useHwf: `${urls.HELP_WITH_FEES_DEEMED}`,
    hwfReference: `${urls.HWF_REFERENCE_NUMBER_INPUT_DEEMED}`,
    canUploadEvidence: `${urls.WANT_UPLOAD_EVIDENCE_DEEMED}`,
    uploadedFiles: `${urls.UPLOAD_EVIDENCE_DEEMED}`,
    evidenceDetails: `${urls.HOW_DO_YOU_KNOW_DEEMED}`,
    noEvidenceStatement: `${urls.WHY_NO_EVIDENCE_DEEMED}`,
  },
});

const cy: typeof en = (
  useHwf,
  hwfReference,
  canUpload,
  uploadedDocsFilenames,
  evidenceDetails,
  noEvidenceStatement
) => ({
  stepQuestions: {
    useHwf: 'Use Help With Fees',
    hwfReference: 'HWF Reference',
    canUploadEvidence: 'I can upload evidence',
    uploadedFiles: 'Uploaded files',
    evidenceDetails: 'Details',
    noEvidenceStatement: 'No Evidence Statement',
  },
  stepAnswers: {
    useHwf: `${useHwf}`,
    hwfReference: `${hwfReference}`,
    canUploadEvidence: `${canUpload}`,
    uploadedFiles: `${uploadedDocsFilenames}`,
    evidenceDetails: `${evidenceDetails}`,
    noEvidenceStatement: `${noEvidenceStatement}`,
  },
  stepLinks: {
    useHwf: `${urls.HELP_WITH_FEES_DEEMED}`,
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
  const useHwf = content.userCase.applicant1InterimAppsUseHelpWithFees;
  const hwfReference = content.userCase.applicant1InterimAppsHwfRefNumber;
  const canUpload = content.userCase.applicant1InterimAppsCanUploadEvidence;
  let uploadedDocsFilenames;
  let cannotUploadDocs;
  let evidenceDetails;
  let noEvidenceStatement;
  if (canUpload === YesOrNo.YES) {
    uploadedDocsFilenames = content.userCase.applicant1InterimAppsEvidenceDocs?.map(item => getFilename(item.value));
    cannotUploadDocs =
      content.userCase.applicant1InterimAppsCannotUploadDocs === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
    evidenceDetails = content.userCase.applicant1DeemedEvidenceDetails;
  } else {
    noEvidenceStatement = content.userCase.applicant1DeemedNoEvidenceStatement;
  }
  const translations = languages[content.language](
    useHwf,
    hwfReference,
    canUpload,
    uploadedDocsFilenames,
    evidenceDetails,
    noEvidenceStatement
  );
  return {
    ...checkAnswersContent,
    ...translations,
    form,
    useHwf,
    hwfReference,
    canUpload,
    uploadedDocsFilenames,
    cannotUploadDocs,
    evidenceDetails,
    noEvidenceStatement,
  };
};
