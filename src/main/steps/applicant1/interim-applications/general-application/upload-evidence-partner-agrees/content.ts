import config from 'config';
import { isObject } from 'lodash';

import { CaseWithId, Checkbox } from '../../../../../app/case/case';
import { getFilename } from '../../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { generateContent as uploadDocumentGenerateContent } from '../../../upload-your-documents/content';

const en = ({ partner }: CommonContent, applicant1UploadDocumentContent) => ({
  title: 'Upload your evidence',
  line1: `Provide the evidence that shows that your ${partner} agrees (consents) to this application.`,
  line2: 'Suitable evidence may include:',
  evidenceList: {
    line1: `signed statement from both you and your ${partner} that you both agree to this application`,
    line2: `a letter or email from your ${partner} to say that they agree to your application`,
  },
  evidenceReminder:
    "If you're uploading images or screenshots of a recent conversation, it may be helpful if they show:",
  toInclude: {
    partnersName: `your ${partner}'s name`,
    dateSent: 'the date the letter or email was sent',
    partnersContactInfo: `your ${partner}'s contact details`,
  },
  line3: `If your evidence is a conversation in a language other than English, you'll need to provide a <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.certifiedTranslation'
  )}">certified translation</a>.`,
  line4: 'You may need to upload multiple documents.',
  line5: 'You cannot upload video or audio recordings.',
  uploadAFile: 'Upload a file',
  chooseFileButtonText: 'Choose file',
  noFileChosen: 'No file chosen',
  uploadedFiles: 'Uploaded files',
  noFilesUploaded: 'No files uploaded',
  cannotUpload: 'I cannot upload some or all of my documents',
  errors: {
    applicant1GenAppPartnerAgreesUploadedFiles: {
      notUploaded: "Upload your documents, or select 'I cannot upload some or all of my documents'.",
      errorUploading: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileWrongFormat,
    },
    applicant1GenAppCannotUploadAgreedEvidence: {
      notUploaded: "Upload your documents, or select 'I cannot upload some or all of my documents'.",
    },
    applicant2GenAppPartnerAgreesUploadedFiles: {
      notUploaded: "Upload your documents, or select 'I cannot upload some or all of my documents'.",
      errorUploading: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileWrongFormat,
    },
    applicant2GenAppCannotUploadAgreedEvidence: {
      notUploaded: "Upload your documents, or select 'I cannot upload some or all of my documents'.",
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent, applicant1UploadDocumentContent) => ({
  title: 'Uwchlwytho eich tystiolaeth',
  line1: `Provide the evidence that shows that your ${partner} agrees (consents) to this application.`,
  line2: 'Suitable evidence may include:',
  evidenceList: {
    line1: `signed statement from both you and your ${partner} that you both agree to this application`,
    line2: `a letter or email from your ${partner} to say that they agree to your application`,
  },
  evidenceReminder:
    "If you're uploading images or screenshots of a recent conversation, it may be helpful if they show:",
  toInclude: {
    partnersName: `your ${partner}'s name`,
    dateSent: 'the date the letter or email was sent',
    partnersContactInfo: `your ${partner}'s contact details`,
  },
  line3: `If your evidence is a conversation in a language other than English, you'll need to provide a <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.certifiedTranslation'
  )}">certified translation</a>.`,
  line4: 'You may need to upload multiple documents.',
  line5: 'You cannot upload video or audio recordings.',
  uploadAFile: 'Upload a file',
  chooseFileButtonText: 'Choose file',
  noFileChosen: 'No file chosen',
  uploadedFiles: 'Uploaded files',
  noFilesUploaded: 'No files uploaded',
  cannotUpload: 'I cannot upload some or all of my documents',
  errors: {
    applicant1GenAppPartnerAgreesUploadedFiles: {
      notUploaded: "Upload your documents, or select 'I cannot upload some or all of my documents'.",
      errorUploading: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileWrongFormat,
    },
    applicant1GenAppCannotUploadAgreedEvidence: {
      notUploaded: "Upload your documents, or select 'I cannot upload some or all of my documents'.",
    },
    applicant2GenAppPartnerAgreesUploadedFiles: {
      notUploaded: "Upload your documents, or select 'I cannot upload some or all of my documents'.",
      errorUploading: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1UploadDocumentContent.errors.applicant1UploadedFiles.fileWrongFormat,
    },
    applicant2GenAppCannotUploadAgreedEvidence: {
      notUploaded: "Upload your documents, or select 'I cannot upload some or all of my documents'.",
    },
  },
});

const languages = {
  en,
  cy,
};

const uploadedFilesField = (
  userCase: Partial<CaseWithId>,
  uploadedFilesFieldName: keyof CaseWithId,
  cannotUploadEvidenceFieldName: keyof CaseWithId
) => ({
  type: 'hidden',
  label: l => l.uploadFiles,
  labelHidden: true,
  value:
    (isObject(userCase[uploadedFilesFieldName])
      ? JSON.stringify(userCase[uploadedFilesFieldName])
      : userCase[uploadedFilesFieldName]) || '[]',
  parser: data => JSON.parse((data as Record<string, string>)[uploadedFilesFieldName] || '[]'),
  validator: (value, formData) => {
    const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
    const selectedCannotUploadDocuments = !!formData[cannotUploadEvidenceFieldName]?.length;
    if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
      return 'notUploaded';
    }
  },
});

const cannotUploadEvidenceField = (
  userCase: Partial<CaseWithId>,
  uploadedFilesFieldName: keyof CaseWithId,
  cannotUploadEvidenceFieldName: keyof CaseWithId
) => ({
  type: 'checkboxes',
  label: l => l.cannotUpload,
  labelHidden: true,
  validator: (value, formData) => {
    const hasUploadedFiles =
      (formData[uploadedFilesFieldName] as unknown as string[])?.length &&
      (formData[uploadedFilesFieldName] as unknown as string) !== '[]';
    const selectedCannotUploadDocuments = !!formData[cannotUploadEvidenceFieldName]?.length;
    if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
      return 'notUploaded';
    }
  },
  values: [
    {
      name: cannotUploadEvidenceFieldName,
      label: l => l.cannotUpload,
      value: Checkbox.Checked,
    },
  ],
});

export const applicant1Form: FormContent = {
  fields: userCase => {
    const uploadedFilesFieldName: keyof CaseWithId = 'applicant1GenAppPartnerAgreesUploadedFiles';
    const cannotUploadEvidenceFieldName: keyof CaseWithId = 'applicant1GenAppCannotUploadAgreedEvidence';
  
    return {
      applicant1GenAppPartnerAgreesUploadedFiles: uploadedFilesField(
        userCase, uploadedFilesFieldName, cannotUploadEvidenceFieldName
      ),
      applicant1GenAppCannotUploadAgreedEvidence: cannotUploadEvidenceField(
        userCase, uploadedFilesFieldName, cannotUploadEvidenceFieldName
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
    const uploadedFilesFieldName: keyof CaseWithId = 'applicant2GenAppPartnerAgreesUploadedFiles';
    const cannotUploadEvidenceFieldName: keyof CaseWithId = 'applicant2GenAppCannotUploadAgreedEvidence';
  
    return {
      applicant2GenAppPartnerAgreesUploadedFiles: uploadedFilesField(
        userCase, uploadedFilesFieldName, cannotUploadEvidenceFieldName
      ),
      applicant2GenAppCannotUploadAgreedEvidence: cannotUploadEvidenceField(
        userCase, uploadedFilesFieldName, cannotUploadEvidenceFieldName
      ),
    }
  },
};

export const generateContent: TranslationFn = content => {
  const applicant1UploadDocumentContent = uploadDocumentGenerateContent(content);
  const translations = languages[content.language](content, applicant1UploadDocumentContent);
  const userCase = content.userCase;
  const uploadedDocs = content.isApplicant2
    ? userCase?.applicant2GenAppPartnerAgreesDocs
    : userCase?.applicant1GenAppPartnerAgreesDocs;
  
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
    uploadedDocsFilenames,
    amendable,
    uploadContentScript,
  };
};
