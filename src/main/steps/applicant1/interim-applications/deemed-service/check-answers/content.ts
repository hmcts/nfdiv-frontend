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
    useHwf: 'Help paying the application fee',
    hwfReference: 'Help with fees reference number',
    canUploadEvidence: 'Are you able to upload evidence?',
    uploadedFiles: 'Uploaded files',
    evidenceDetails: 'Details about your evidence',
    noEvidenceStatement: 'Supporting statement',
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
    useHwf: 'Help i dalu’r ffi gwneud cais',
    hwfReference: 'Cyfeirnod help i dalu ffioedd',
    canUploadEvidence: 'A ydych yn gallu uwchlwytho tystiolaeth?',
    uploadedFiles: 'Ffeiliau wedi’u huwchlwytho',
    evidenceDetails: 'Manylion am eich tystiolaeth',
    noEvidenceStatement: 'Datganiad i Gefnogi Cais',
  },
  stepAnswers: {
    useHwf: `${useHwf === YesOrNo.YES ? 'Ydy' : 'Nac ydw'}`,
    hwfReference: `${hwfReference}`,
    canUploadEvidence: `${canUpload === YesOrNo.YES ? 'Ydy' : 'Nac ydw'}`,
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
  const uploadedDocsFilenames =
    canUpload === YesOrNo.YES
      ? content.userCase.applicant1InterimAppsEvidenceDocs?.map(item => getFilename(item.value))
      : undefined;
  const cannotUploadDocs =
    content.userCase.applicant1InterimAppsCannotUploadDocs === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
  const evidenceDetails = content.userCase.applicant1DeemedEvidenceDetails;
  const noEvidenceStatement = content.userCase.applicant1DeemedNoEvidenceStatement;
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
