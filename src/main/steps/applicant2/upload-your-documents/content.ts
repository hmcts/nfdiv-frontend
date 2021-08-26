import { isObject } from 'lodash';

import { DocumentType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/upload-your-documents/content';

const labels = applicant1Content => ({
  errors: {
    applicant2UploadedFiles: {
      notUploaded: applicant1Content.errors.applicant1UploadedFiles.notUploaded,
      errorUploading: applicant1Content.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1Content.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1Content.errors.applicant1UploadedFiles.fileWrongFormat,
    },
    applicant2CannotUpload: {
      required: applicant1Content.errors.applicant1CannotUpload.required,
    },
  },
});

export const form: FormContent = {
  ...applicant1Form,
  fields: formState => {
    const checkboxes: { id: string; value: DocumentType }[] = [];
    checkboxes.push({
      id: 'cannotUploadNameChangeProof',
      value: DocumentType.NAME_CHANGE_EVIDENCE,
    });

    return {
      applicant2UploadedFiles: {
        type: 'hidden',
        label: l => l.uploadFiles,
        labelHidden: true,
        value:
          (isObject(formState.applicant2UploadedFiles)
            ? JSON.stringify(formState.applicant2UploadedFiles)
            : formState.applicant2UploadedFiles) || '[]',
        parser: data => JSON.parse((data as Record<string, string>).applicant2UploadedFiles || '[]'),
        validator: (value, formData) => {
          const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
          const selectedCannotUploadDocuments = !!formData.applicant2CannotUploadDocuments?.length;
          if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
            return 'notUploaded';
          }
        },
      },
      ...(checkboxes.length === 1
        ? {
            applicant2CannotUploadDocuments: {
              type: 'checkboxes',
              label: l => l.cannotUploadDocuments,
              labelHidden: true,
              subtext: l => l.cannotUploadYouCanPost,
              values: checkboxes.map(checkbox => ({
                name: 'applicant2CannotUploadDocuments',
                label: l => l[`${checkbox.id}Singular`],
                value: checkbox.value,
              })),
            },
          }
        : {}),
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(applicant1Content),
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.formState || {}) },
  };
};
