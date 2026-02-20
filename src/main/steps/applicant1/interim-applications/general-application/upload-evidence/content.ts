import config from 'config';
import { isEmpty, isObject } from 'lodash';

import { Checkbox } from '../../../../../app/case/case';
import { getFilename } from '../../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { generateContent as uploadDocumentGenerateContent } from '../../../../applicant1/upload-your-documents/content';

const en = applicant1UploadDocumentContent => ({
  title: 'Provide statement or upload evidence',
  statement: 'You can provide a statement and upload any documents you have in support of your application.',
  statementLabel: 'Provide statement (optional)',
  uploadFilesLabel: 'Upload evidence (optional)',
  line3: `If your evidence is in a language other than English, you'll need to provide a <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.certifiedTranslation'
  )}">certified translation</a>.`,
  line4: 'You may upload multiple documents.',
  line5: 'You cannot upload video or audio recordings.',
  uploadAFile: 'Upload a file',
  chooseFileButtonText: 'Choose file',
  noFileChosen: 'No file chosen',
  uploadedFiles: 'Uploaded files',
  noFilesUploaded: 'No files uploaded',
  cannotUpload: 'I cannot upload some or all of my documents',
  cannotUploadInfo:
    'You can send your documents to the court by post or webform. You must send your evidence and any certified translations if you need them. You’ll receive details of how to send them after you’ve submitted this application.',
  errors: {
    applicant1InterimAppsEvidenceUploadedFiles: {
      notUploaded: "Upload your documents, or select 'I cannot upload some or all of my documents'.",
      errorUploading: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileWrongFormat,
    },
    applicant1InterimAppsCannotUploadDocs: {
      notUploaded: "Upload your documents, or select 'I cannot upload some or all of my documents'.",
    },
  },
});

const cy: typeof en = applicant1UploadDocumentContent => ({
  title: 'Provide statement or upload evidence',
  statement: 'You can provide a statement and upload any documents you have in support of your application.',
  statementLabel: 'Provide statement (optional)',
  uploadFilesLabel: 'Upload evidence (optional)',
  line3: `If your evidence is in a language other than English, you'll need to provide a <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.certifiedTranslation'
  )}">certified translation</a>.`,
  line4: 'You may upload multiple documents.',
  line5: 'You cannot upload video or audio recordings.',
  uploadAFile: 'Upload a file',
  chooseFileButtonText: 'Choose file',
  noFileChosen: 'No file chosen',
  uploadedFiles: 'Uploaded files',
  noFilesUploaded: 'No files uploaded',
  cannotUpload: 'I cannot upload some or all of my documents',
  cannotUploadInfo:
    'You can send your documents to the court by post or webform. You must send your evidence and any certified translations if you need them. You’ll receive details of how to send them after you’ve submitted this application.',
  errors: {
    applicant1InterimAppsEvidenceUploadedFiles: {
      notUploaded: "Upload your documents, or select 'I cannot upload some or all of my documents'.",
      errorUploading: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileWrongFormat,
    },
    applicant1InterimAppsCannotUploadDocs: {
      notUploaded: "Upload your documents, or select 'I cannot upload some or all of my documents'.",
    },
  },
});

export const form: FormContent = {
  fields: userCase => ({
    applicant1GenAppStatementOfEvidence: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.statementLabel,
      labelHidden: true,
      validator: value => {
        const hasEnteredDetails = !isEmpty(value);
        if (!hasEnteredDetails) {
          return 'required';
        }
      },
    },
    applicant1InterimAppsEvidenceUploadedFiles: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
      value:
        (isObject(userCase.applicant1InterimAppsEvidenceUploadedFiles)
          ? JSON.stringify(userCase.applicant1InterimAppsEvidenceUploadedFiles)
          : userCase.applicant1InterimAppsEvidenceUploadedFiles) || '[]',
      parser: data => JSON.parse((data as Record<string, string>).applicant1InterimAppsEvidenceUploadedFiles || '[]'),
      validator: (value, formData) => {
        const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.applicant1InterimAppsCannotUploadDocs?.length;
        if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
          return 'notUploaded';
        }
      },
    },
    applicant1InterimAppsCannotUploadDocs: {
      type: 'checkboxes',
      label: l => l.cannotUpload,
      labelHidden: true,
      values: [
        {
          name: 'applicant1InterimAppsCannotUploadDocs',
          label: l => l.cannotUpload,
          value: Checkbox.Checked,
          conditionalText: l => `<p class="govuk-body govuk-!-margin-top-5">${l.cannotUploadInfo}</p>`,
        },
      ],
    },
  }),
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const applicant1UploadDocumentContent = uploadDocumentGenerateContent(content);
  const translations = languages[content.language](applicant1UploadDocumentContent);
  const uploadedDocsFilenames = content.userCase.applicant1InterimAppsEvidenceDocs?.map(item =>
    getFilename(item.value)
  );
  const amendable = true;
  const uploadContentScript = `{
    "isAmendableStates": ${content.isAmendableStates},
    "delete": "${content.delete}"
  }`;
  return {
    ...applicant1UploadDocumentContent,
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    amendable,
    uploadedDocsFilenames,
    uploadContentScript,
  };
};
