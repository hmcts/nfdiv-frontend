import { isObject } from 'lodash';

import { Checkbox } from '../../../../../app/case/case';
import { YesOrNo } from '../../../../../app/case/definition';
import { getFilename } from '../../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { isInvalidHelpWithFeesRef } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';
import * as urls from '../../../../urls';

const en = (
  useHwf,
  haveHwfReference,
  hwfReference,
  canUpload,
  uploadedDocsFilenames,
  evidenceDetails,
  noEvidenceStatement,
  usingHwf,
  { submit, continueToPay }: CommonContent
) => ({
  title: 'Check your answers',
  noFilesUploaded: 'No files uploaded',
  notProvided: 'Not provided',
  havingTroubleUploading: "I'm having trouble uploading some or all of my documents",
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
  submitText: usingHwf ? submit : continueToPay,
});

const cy: typeof en = (
  useHwf,
  haveHwfReference,
  hwfReference,
  canUpload,
  uploadedDocsFilenames,
  evidenceDetails,
  noEvidenceStatement,
  usingHwf,
  { submit, continueToPay }: CommonContent
) => ({
  title: 'Check your answers',
  noFilesUploaded: 'No files uploaded',
  notProvided: 'Not provided',
  havingTroubleUploading: "I'm having trouble uploading some or all of my documents",
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
  submitText: usingHwf ? submit : continueToPay,
});

export const form: FormContent = {
  fields: userCase => ({
    applicant1DeemedIUnderstand: {
      type: 'hidden',
      values: [],
    },
    applicant1GenAppsUseHelpWithFees: {
      type: 'hidden',
      values: [],
    },
    applicant1GenAppsHaveHwfReference: {
      type: 'hidden',
      values: [],
    },
    applicant1GenAppsHwfRefNumber: {
      type: 'hidden',
      label: l => l.response,
      labelHidden: true,
    },
    applicant1GenAppsCanUploadEvidence: {
      type: 'hidden',
      values: [],
    },
    applicant1GenAppsEvidenceUploadedFiles: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
      value:
        (isObject(userCase.applicant1GenAppsEvidenceUploadedFiles)
          ? JSON.stringify(userCase.applicant1GenAppsEvidenceUploadedFiles)
          : userCase.applicant1GenAppsEvidenceUploadedFiles) || '[]',
      parser: data => JSON.parse((data as Record<string, string>).applicant1GenAppsEvidenceUploadedFiles || '[]'),
    },
    applicant1GenAppsCannotUploadDocs: {
      type: 'hidden',
      values: [],
    },
    applicant1DeemedEvidenceDetails: {
      type: 'hidden',
      label: l => l.response,
      labelHidden: true,
    },
    applicant1DeemedNoEvidenceStatement: {
      type: 'hidden',
      label: l => l.response,
      labelHidden: true,
    },
  }),
  submit: {
    text: l => l.submitText,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const useHwf = content.userCase.applicant1GenAppsUseHelpWithFees;
  const haveHwfReference = content.userCase.applicant1GenAppsHaveHwfReference;
  const hwfReference = content.userCase.applicant1GenAppsHwfRefNumber;
  const canUpload = content.userCase.applicant1GenAppsCanUploadEvidence;
  const uploadedDocsFilenames = content.userCase.applicant1GenAppsEvidenceDocs?.map(item => getFilename(item.value));
  const cannotUploadDocs =
    content.userCase.applicant1GenAppsCannotUploadDocs === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
  const evidenceDetails = content.userCase.applicant1DeemedEvidenceDetails;
  const noEvidenceStatement = content.userCase.applicant1DeemedNoEvidenceStatement;
  const usingHwf =
    useHwf === YesOrNo.YES && haveHwfReference === YesOrNo.YES && isInvalidHelpWithFeesRef(hwfReference) === undefined;
  const translations = languages[content.language](
    useHwf,
    haveHwfReference,
    hwfReference,
    canUpload,
    uploadedDocsFilenames,
    evidenceDetails,
    noEvidenceStatement,
    usingHwf,
    content
  );
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
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
