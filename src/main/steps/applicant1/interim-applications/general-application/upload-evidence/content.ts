import config from 'config';
import { isObject } from 'lodash';

import { CaseWithId, Checkbox } from '../../../../../app/case/case';
import { getFilename } from '../../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { generateContent as uploadDocumentGenerateContent } from '../../../../applicant1/upload-your-documents/content';

const en = applicant1UploadDocumentContent => ({
  title: 'Provide statement or upload evidence',
  statement: 'You can provide a statement and upload any documents you have in support of your application.',
  statementLabel: 'Provide statement (optional)',
  uploadFilesLabel: 'Upload evidence (optional)',
  line1: `If your evidence is in a language other than English, you'll need to provide a <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.certifiedTranslation'
  )}">certified translation</a>.`,
  line2: 'You may upload multiple documents.',
  line3: 'You cannot upload video or audio recordings.',
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
      notUploaded:
        "You must either provide a statement, upload evidence, or select 'I cannot upload some or all of my documents'.",
      errorUploading: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileWrongFormat,
    },
    applicant1InterimAppsCannotUploadDocs: {
      notUploaded:
        "You must either provide a statement, upload evidence, or select 'I cannot upload some or all of my documents'.",
    },
    applicant1GenAppStatementOfEvidence: {
      notUploaded:
        "You must either provide a statement, upload evidence, or select 'I cannot upload some or all of my documents'.",
    },
    applicant2InterimAppsCannotUploadDocs: {
      notUploaded:
        "You must either provide a statement, upload evidence, or select 'I cannot upload some or all of my documents'.",
    },
    applicant2GenAppStatementOfEvidence: {
      notUploaded:
        "You must either provide a statement, upload evidence, or select 'I cannot upload some or all of my documents'.",
    },
  },
});

const cy: typeof en = applicant1UploadDocumentContent => ({
  title: 'Provide statement or upload evidence',
  statement: 'You can provide a statement and upload any documents you have in support of your application.',
  statementLabel: 'Provide statement (optional)',
  uploadFilesLabel: 'Upload evidence (optional)',
  line1: `If your evidence is in a language other than English, you'll need to provide a <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.certifiedTranslation'
  )}">certified translation</a>.`,
  line2: 'You may upload multiple documents.',
  line3: 'You cannot upload video or audio recordings.',
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
      notUploaded:
        "You must either provide a statement, upload evidence, or select 'I cannot upload some or all of my documents'.",
      errorUploading: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileWrongFormat,
    },
    applicant1InterimAppsCannotUploadDocs: {
      notUploaded:
        "You must either provide a statement, upload evidence, or select 'I cannot upload some or all of my documents'.",
    },
    applicant1GenAppStatementOfEvidence: {
      notUploaded:
        "You must either provide a statement, upload evidence, or select 'I cannot upload some or all of my documents'.",
    },
    applicant2InterimAppsCannotUploadDocs: {
      notUploaded:
        "You must either provide a statement, upload evidence, or select 'I cannot upload some or all of my documents'.",
    },
    applicant2GenAppStatementOfEvidence: {
      notUploaded:
        "You must either provide a statement, upload evidence, or select 'I cannot upload some or all of my documents'.",
    },
  },
});

const genAppsStatementOfEvidenceField = () => {
  return {
    type: 'textarea',
    classes: 'govuk-input--width-40',
    label: l => l.statementLabel,
    labelHidden: true
  }
}

const uploadedFilesField = (
  userCase: Partial<CaseWithId>,
  uploadedFilesFieldName: keyof CaseWithId,
  cannotUploadEvidenceFieldName: keyof CaseWithId,
  statementOfEvidenceFieldName: keyof CaseWithId
) => ({
  type: 'hidden',
  label: l => l.uploadFilesLabel,
  labelHidden: true,
  value:
    (isObject(userCase[uploadedFilesFieldName])
      ? JSON.stringify(userCase[uploadedFilesFieldName])
      : userCase[uploadedFilesFieldName]) || '[]',
  parser: data => JSON.parse((data as Record<string, string>)[uploadedFilesFieldName] || '[]'),
  validator: (value, formData) => {
    const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
    const selectedCannotUploadDocuments = !!formData[cannotUploadEvidenceFieldName]?.length;
    const hasStatement = !!formData[statementOfEvidenceFieldName]?.length;
    if (!hasUploadedFiles && !selectedCannotUploadDocuments && !hasStatement) {
      return 'notUploaded';
    }
  },
});

const cannotUploadEvidenceField = (cannotUploadEvidenceFieldName: keyof CaseWithId) => ({
  type: 'checkboxes',
  label: l => l.cannotUpload,
  labelHidden: true,
  values: [
    {
      name: cannotUploadEvidenceFieldName,
      label: l => l.cannotUpload,
      value: Checkbox.Checked,
      conditionalText: l => `<p class="govuk-body govuk-!-margin-top-5">${l.cannotUploadInfo}</p>`,
    },
  ],
});

export const applicant1Form: FormContent = {
  fields: userCase => {
    const uploadedFilesFieldName: keyof CaseWithId = 'applicant1InterimAppsEvidenceUploadedFiles';
    const cannotUploadEvidenceFieldName: keyof CaseWithId = 'applicant1InterimAppsCannotUploadDocs';
    const statementOfEvidenceFieldName: keyof CaseWithId = 'applicant1GenAppStatementOfEvidence';
  
    return {
      applicant1GenAppStatementOfEvidence: genAppsStatementOfEvidenceField(),
      applicant1InterimAppsEvidenceUploadedFiles: uploadedFilesField(
        userCase, uploadedFilesFieldName, cannotUploadEvidenceFieldName, statementOfEvidenceFieldName
      ),
      applicant1InterimAppsCannotUploadDocs: cannotUploadEvidenceField(
        cannotUploadEvidenceFieldName
      ),
    }
  },
  submit: {
    text: l => l.continue,
  },
};

export const applicant2Form: FormContent = {
  ...applicant1Form,
  fields: userCase => {
    const uploadedFilesFieldName: keyof CaseWithId = 'applicant2InterimAppsEvidenceUploadedFiles';
    const cannotUploadEvidenceFieldName: keyof CaseWithId = 'applicant2InterimAppsCannotUploadDocs';
    const statementOfEvidenceFieldName: keyof CaseWithId = 'applicant2GenAppStatementOfEvidence';
  
    return {
      applicant2GenAppStatementOfEvidence: genAppsStatementOfEvidenceField(),
      applicant2InterimAppsEvidenceUploadedFiles: uploadedFilesField(
        userCase, uploadedFilesFieldName, cannotUploadEvidenceFieldName, statementOfEvidenceFieldName
      ),
      applicant2InterimAppsCannotUploadDocs: cannotUploadEvidenceField(
        cannotUploadEvidenceFieldName
      ),
    }
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const applicant1UploadDocumentContent = uploadDocumentGenerateContent(content);
  const translations = languages[content.language](applicant1UploadDocumentContent);
  const userCase = content.userCase;

  const uploadedDocs = content.isApplicant2
    ? userCase?.applicant2InterimAppsEvidenceDocs
    : userCase?.applicant1InterimAppsEvidenceDocs;
  const uploadedDocsFilenames = uploadedDocs?.map(item =>
    getFilename(item.value)
  );
  const amendable = true;
  const uploadContentScript = `{
    "isAmendableStates": ${content.isAmendableStates},
    "delete": "${content.delete}"
  }`;
  const form = content.isApplicant2 ? applicant2Form : applicant1Form;

  return {
    ...applicant1UploadDocumentContent,
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    amendable,
    uploadedDocsFilenames,
    uploadContentScript,
  };
};
