import { isObject } from 'lodash';

import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as uploadDocumentGenerateContent } from '../../applicant1/upload-your-documents/content';

const en = ({ partner, applicant1Content, required, referenceNumber }) => ({
  title: 'Respond to the court',
  line1: `You should agree your response with your ${partner} before submitting it to the court.`,
  line2: 'The court has made the following comments on your application:',
  subheading1: 'Enter your response',
  line4:
    'If the court wants you to explain something or provide additional information then write your response here. If the court has just asked you to upload documents then you do not have to write anything, unless you think it’s useful information.',
  uploadTitle: 'Upload any documents',
  line5:
    'If the court has asked you to upload any documents or you want to upload a document to support what you wrote above, then you can upload it here.',
  cannotUploadDocuments: 'I cannot upload some or all of my documents',
  cannotUploadYouCanPost: `<p class="govuk-body govuk-!-margin-top-5">You can post your documents to the court if you cannot upload them, or you think uploading them will not help. You must send the original documents or certified copies. Make sure you include a covering letter with your case number: <strong>${referenceNumber}</strong></br></br>
    <strong>Courts and Tribunals Service Centre</strong></br>
    Digital Divorce</br>
    PO Box 12706</br>
    Harlow</br>
    CM20 9QT</p>`,
  errors: {
    coClarificationResponses: {
      required,
    },
    coClarificationUploadedFiles: {
      notUploaded: applicant1Content.errors.applicant1UploadedFiles.notUploaded,
      errorUploading: applicant1Content.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1Content.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1Content.errors.applicant1UploadedFiles.fileWrongFormat,
    },
    coCannotUploadClarificationDocuments: {
      required: applicant1Content.errors.applicant1CannotUpload.required,
    },
  },
});

const cy = en;

export const form: FormContent = {
  fields: userCase => ({
    coClarificationResponses: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.line4,
      labelHidden: true,
      validator: isFieldFilledIn,
    },
    coClarificationUploadedFiles: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
      value:
        (isObject(userCase.coClarificationUploadedFiles)
          ? JSON.stringify(userCase.coClarificationUploadedFiles)
          : userCase.coClarificationUploadedFiles) || '[]',
      parser: data => JSON.parse((data as Record<string, string>).coClarificationUploadedFiles || '[]'),
      validator: (value, formData) => {
        const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.coCannotUploadClarificationDocuments?.length;
        if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
          return 'notUploaded';
        }
      },
    },
    coCannotUploadClarificationDocuments: {
      type: 'checkboxes',
      label: l => l.cannotUploadDocuments,
      labelHidden: true,
      values: [
        {
          name: 'coCannotUploadClarificationDocuments',
          label: l => l.cannotUploadDocuments,
          value: Checkbox.Checked,
          conditionalText: l => l.cannotUploadYouCanPost,
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
  const applicant1Content = uploadDocumentGenerateContent(content);
  const referenceNumber = content.userCase.id?.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
  return {
    ...applicant1Content,
    ...languages[content.language]({ applicant1Content, ...content, referenceNumber }),
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
