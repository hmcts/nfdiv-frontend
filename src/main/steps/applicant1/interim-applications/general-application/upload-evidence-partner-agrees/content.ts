import config from 'config';
import { isObject } from 'lodash';

import { Checkbox } from '../../../../../app/case/case';
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
  line6: 'The file must be in jpg, bmp, tiff, png or pdf format.',
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
  line6: 'The file must be in jpg, bmp, tiff, png or pdf format.',
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
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: userCase => ({
    applicant1GenAppPartnerAgreesUploadedFiles: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
      value:
        (isObject(userCase.applicant1GenAppPartnerAgreesUploadedFiles)
          ? JSON.stringify(userCase.applicant1GenAppPartnerAgreesUploadedFiles)
          : userCase.applicant1GenAppPartnerAgreesUploadedFiles) || '[]',
      parser: data => JSON.parse((data as Record<string, string>).applicant1GenAppPartnerAgreesUploadedFiles || '[]'),
      validator: (value, formData) => {
        const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.applicant1GenAppCannotUploadAgreedEvidence?.length;
        if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
          return 'notUploaded';
        }
      },
    },
    applicant1GenAppCannotUploadAgreedEvidence: {
      type: 'checkboxes',
      label: l => l.cannotUpload,
      labelHidden: true,
      validator: (value, formData) => {
        const hasUploadedFiles =
          (formData.applicant1GenAppPartnerAgreesUploadedFiles as unknown as string[])?.length &&
          (formData.applicant1GenAppPartnerAgreesUploadedFiles as unknown as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.applicant1GenAppCannotUploadAgreedEvidence?.length;
        if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
          return 'notUploaded';
        }
      },
      values: [
        {
          name: 'applicant1GenAppCannotUploadAgreedEvidence',
          label: l => l.cannotUpload,
          value: Checkbox.Checked,
        },
      ],
    },
  }),
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const applicant1UploadDocumentContent = uploadDocumentGenerateContent(content);
  const translations = languages[content.language](content, applicant1UploadDocumentContent);
  const uploadedDocsFilenames = content.userCase.applicant1GenAppPartnerAgreesDocs?.map(item =>
    getFilename(item.value)
  );
  console.log(uploadedDocsFilenames);
  const amendable = true;
  const uploadContentScript = `{
    "isAmendableStates": ${content.isAmendableStates},
    "delete": "${content.delete}"
  }`;
  return {
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    ...translations,
    uploadedDocsFilenames,
    amendable,
    uploadContentScript,
  };
};
