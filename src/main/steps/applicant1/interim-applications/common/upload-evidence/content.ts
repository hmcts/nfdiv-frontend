import config from 'config';
import { isObject } from 'lodash';

import { Checkbox } from '../../../../../app/case/case';
import { getFilename } from '../../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { generateContent as uploadDocumentGenerateContent } from '../../../../applicant1/upload-your-documents/content';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent, applicant1UploadDocumentContent) => ({
  title: 'Upload your evidence',
  statement: '',
  line2:
    "If you're uploading images or screenshots of a recent conversation by text, email or social media, make sure they include:",
  toInclude: {
    partnersName: `your ${partner}'s name`,
    dateMessageSent: 'the date the messages were sent',
    partnersContactInfo: `your ${partner}'s email address, phone number or social media username as appropriate`,
  },
  line3: `If your evidence is a conversation in a language other than English, you'll need to provide a <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.certifiedTranslation'
  )}">certified translation (opens in a new tab).</a>`,
  line4: 'You may need to upload multiple documents.',
  line5: 'The court cannot accept video or audio recordings as evidence.',
  uploadAFile: 'Upload a file',
  chooseFileButtonText: 'Choose file',
  noFileChosen: 'No file chosen',
  uploadedFiles: 'Uploaded files',
  noFilesUploaded: 'No files uploaded',
  cannotUpload: 'I cannot upload some or all of my documents',
  cannotUploadInfo:
    'You can post or email your documents to the court. You must send your evidence and any certified translations if you need them. You’ll receive details of how to send them after you’ve submitted this application.',
  errors: {
    applicant1InterimAppsEvidenceUploadedFiles: {
      notUploaded:
        'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. If you are having trouble uploading any documents, select that option.',
      errorUploading: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileWrongFormat,
    },
    applicant1InterimAppsCannotUploadDocs: {
      notUploaded:
        'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. If you are having trouble uploading any documents, select that option.',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent, applicant1UploadDocumentContent) => ({
  title: 'Upload your evidence',
  statement: '',
  line2:
    "If you're uploading images or screenshots of a recent conversation by text, email or social media, make sure they include:",
  toInclude: {
    partnersName: `your ${partner}'s name`,
    dateMessageSent: 'the date the messages were sent',
    partnersContactInfo: `your ${partner}'s email address, phone number or social media username as appropriate`,
  },
  line3: `If your evidence is a conversation in a language other than English, you'll need to provide a <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.certifiedTranslation'
  )}">certified translation (opens in a new tab).</a>`,
  line4: 'You may need to upload multiple documents.',
  line5: 'The court cannot accept video or audio recordings as evidence.',
  uploadAFile: 'Upload a file',
  chooseFileButtonText: 'Choose file',
  noFileChosen: 'No file chosen',
  uploadedFiles: 'Uploaded files',
  noFilesUploaded: 'No files uploaded',
  cannotUpload: 'I cannot upload some or all of my documents',
  cannotUploadInfo:
    'You can post or email your documents to the court. You must send your evidence and any certified translations if you need them. You’ll receive details of how to send them after you’ve submitted this application.',
  errors: {
    applicant1InterimAppsEvidenceUploadedFiles: {
      notUploaded:
        'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. If you are having trouble uploading any documents, select that option.',
      errorUploading: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileWrongFormat,
    },
    applicant1InterimAppsCannotUploadDocs: {
      notUploaded:
        'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. If you are having trouble uploading any documents, select that option.',
    },
  },
});

export const form: FormContent = {
  fields: userCase => ({
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
      validator: (value, formData) => {
        const hasUploadedFiles =
          (formData.applicant1InterimAppsEvidenceUploadedFiles as unknown as string[])?.length &&
          (formData.applicant1InterimAppsEvidenceUploadedFiles as unknown as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.applicant1InterimAppsCannotUploadDocs?.length;
        if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
          return 'notUploaded';
        }
      },
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
  const translations = languages[content.language](content, applicant1UploadDocumentContent);
  const uploadedDocsFilenames = content.userCase.applicant1InterimAppsEvidenceDocs?.map(item =>
    getFilename(item.value)
  );
  const amendable = content.isAmendableStates;
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
