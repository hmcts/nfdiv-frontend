import { isObject } from 'lodash';

import { Checkbox } from '../../../../../app/case/case';
import { DocumentType } from '../../../../../app/case/definition';
import { getFileMapByDocumentType } from '../../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { generateContent as uploadEvidenceGenerateContent } from '../../common/upload-evidence/content';

const errors = content => ({
  errors: {
    applicant1DispenseNoTraceCertificate: {
      notUploaded: content.errors.applicant1InterimAppsEvidenceUploadedFiles.notUploaded,
      errorUploading: content.errors.applicant1InterimAppsEvidenceUploadedFiles.errorUploading,
      fileSizeTooBig: content.errors.applicant1InterimAppsEvidenceUploadedFiles.fileSizeTooBig,
      fileWrongFormat: content.errors.applicant1InterimAppsEvidenceUploadedFiles.fileWrongFormat,
    },
  },
});

const en = () => ({
  title: "Upload your 'no trace' certificate",
});

const cy: typeof en = () => ({
  title: "Upload your 'no trace' certificate",
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: userCase => ({
    applicant1DispenseNoTraceCertificate: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
      value:
        (isObject(userCase.applicant1DispenseNoTraceCertificate)
          ? JSON.stringify(userCase.applicant1DispenseNoTraceCertificate)
          : userCase.applicant1DispenseNoTraceCertificate) || '[]',
      parser: data => JSON.parse((data as Record<string, string>).applicant1DispenseNoTraceCertificate || '[]'),
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

export const generateContent: TranslationFn = content => {
  const applicant1UploadEvidenceContent = uploadEvidenceGenerateContent(content);
  const translations = languages[content.language]();
  content.userCase.applicant1InterimAppsTempDocUploadType = DocumentType.DISPENSE_NO_TRACE_CERTIFICATE;

  const filesToDisplay = getFileMapByDocumentType(
    content.userCase.applicant1InterimAppsEvidenceDocs,
    DocumentType.DISPENSE_NO_TRACE_CERTIFICATE
  );

  return {
    ...applicant1UploadEvidenceContent,
    ...errors(applicant1UploadEvidenceContent),
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    filesToDisplay,
    useFilesToDisplay: true,
  };
};
