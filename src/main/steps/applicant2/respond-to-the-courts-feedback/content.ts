import { isEmpty, isObject } from 'lodash';

import { Checkbox } from '../../../app/case/case';
import { getFilename } from '../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/respond-to-the-courts-feedback/content';

const labels = applicant1GeneratedContent => ({
  errors: {
    app2RfiDraftResponseDetails: {
      required: applicant1GeneratedContent.errors.app1RfiDraftResponseDetails.required,
    },
    app2RfiDraftResponseUploadedFiles: {
      notUploaded: applicant1GeneratedContent.errors.app1RfiDraftResponseUploadedFiles.notUploaded,
      errorUploading: applicant1GeneratedContent.errors.app1RfiDraftResponseUploadedFiles.errorUploading,
      fileSizeTooBig: applicant1GeneratedContent.errors.app1RfiDraftResponseUploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1GeneratedContent.errors.app1RfiDraftResponseUploadedFiles.fileWrongFormat,
    },
    app2RfiDraftResponseCannotUploadDocs: {
      notUploaded: applicant1GeneratedContent.errors.app1RfiDraftResponseCannotUploadDocs.notUploaded,
    },
  },
});

export const form: FormContent = {
  ...applicant1Form,
  fields: userCase => ({
    app2RfiDraftResponseDetails: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.responseLabel,
      validator: (value, formData) => {
        const hasUploadedFiles =
          (formData.app2RfiDraftResponseUploadedFiles as unknown as string[])?.length &&
          (formData.app2RfiDraftResponseUploadedFiles as unknown as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.app2RfiDraftResponseCannotUploadDocs?.length;
        const hasEnteredDetails = !isEmpty(value);
        if (!hasUploadedFiles && !selectedCannotUploadDocuments && !hasEnteredDetails) {
          return 'required';
        }
      },
    },
    app2RfiDraftResponseUploadedFiles: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
      value:
        (isObject(userCase.app2RfiDraftResponseUploadedFiles)
          ? JSON.stringify(userCase.app2RfiDraftResponseUploadedFiles)
          : userCase.app2RfiDraftResponseUploadedFiles) || '[]',
      parser: data => JSON.parse((data as Record<string, string>).app2RfiDraftResponseUploadedFiles || '[]'),
      validator: (value, formData) => {
        const hasEnteredDetails = !isEmpty(formData.app2RfiDraftResponseDetails);
        const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.app2RfiDraftResponseCannotUploadDocs?.length;
        if (!hasEnteredDetails && !hasUploadedFiles && !selectedCannotUploadDocuments) {
          return 'notUploaded';
        }
      },
    },
    app2RfiDraftResponseCannotUploadDocs: {
      type: 'checkboxes',
      label: l => l.havingTroubleUploading,
      labelHidden: true,
      validator: (value, formData) => {
        const hasEnteredDetails = !isEmpty(formData.app2RfiDraftResponseDetails);
        const hasUploadedFiles =
          (formData.app2RfiDraftResponseUploadedFiles as unknown as string[])?.length &&
          (formData.app2RfiDraftResponseUploadedFiles as unknown as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.app2RfiDraftResponseCannotUploadDocs?.length;
        if (!hasEnteredDetails && !hasUploadedFiles && !selectedCannotUploadDocuments) {
          return 'notUploaded';
        }
      },
      values: [
        {
          name: 'app2RfiDraftResponseCannotUploadDocs',
          label: l => l.havingTroubleUploading,
          value: Checkbox.Checked,
          conditionalText: l => `<p class="govuk-body govuk-!-margin-top-5">${l.havingTroubleUploadingInfo}</p>`,
        },
      ],
    },
  }),
};

export const generateContent: TranslationFn = content => {
  const applicant1GeneratedContent = applicant1GenerateContent(content);
  const uploadedDocsFilenames = content.userCase.app2RfiDraftResponseDocs?.map(item => getFilename(item.value));
  const amendable = content.isRequestForInformationAmendableState;
  const uploadContentScript = `{
    "isRequestForInformationAmendableState": ${content.isRequestForInformationAmendableState},
    "delete": "${content.delete}"
  }`;
  return {
    ...applicant1GeneratedContent,
    ...labels(applicant1GeneratedContent),
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    uploadedDocsFilenames,
    amendable,
    uploadContentScript,
  };
};
