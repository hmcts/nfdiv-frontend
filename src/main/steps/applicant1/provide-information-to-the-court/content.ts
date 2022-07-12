import { isEmpty, isObject } from 'lodash';

import { getFilename } from '../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import {
  generateContent as hubPageContent,
  latestLegalAdvisorDecisionContent,
} from '../../applicant1/hub-page/content';
import { generateContent as uploadDocumentGenerateContent } from '../../applicant1/upload-your-documents/content';
import { formattedCaseId } from '../../common/content.utils';

const en = ({ partner, applicant1Content }) => ({
  title: 'Provide information to the court',
  courtsReasons: 'Read the court’s reason(s) for refusing the application and provide the requested information.',
  agreeYourResponse: `You should agree your response with your ${partner} before submitting it to the court.`,
  subheading1: 'Enter your response',
  response:
    'If the court wants you to explain something or provide additional information then write your response here. If the court has just asked you to upload documents then you do not have to write anything, unless you think it’s useful information.',
  uploadTitle: 'Upload any documents',
  line5:
    'If the court has asked you to upload any documents or you want to upload a document to support what you wrote above, then you can upload it here.',
  cannotUploadDocuments: 'I cannot upload some or all of my documents',
  cannotUploadYouCanPost:
    'You can post your documents to the court if you cannot upload them, or you think uploading them will not help. You must send the original documents or certified copies. Make sure you include a covering letter with your case number: ',
  errors: {
    coClarificationResponses: {
      required:
        'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. Or if you are going to post any documents in, select that option.',
    },
    coClarificationUploadedFiles: {
      errorUploading: applicant1Content.errors.applicant1UploadedFiles.errorUploading,
      fileSizeTooBig: applicant1Content.errors.applicant1UploadedFiles.fileSizeTooBig,
      fileWrongFormat: applicant1Content.errors.applicant1UploadedFiles.fileWrongFormat,
    },
  },
});

const cy = en;

export const form: FormContent = {
  fields: userCase => ({
    coClarificationResponses: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.response,
      validator: (value, formData) => {
        const hasUploadedFiles =
          (formData.coClarificationUploadedFiles as unknown as string[])?.length &&
          (formData.coClarificationUploadedFiles as unknown as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.coCannotUploadClarificationDocuments?.length;
        const hasEnteredResponse = !isEmpty(value);
        if (!hasUploadedFiles && !selectedCannotUploadDocuments && !hasEnteredResponse) {
          return 'required';
        }
      },
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
    },
    coCannotUploadClarificationDocuments: {
      type: 'hidden',
      values: [],
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
  const { userCase } = content;
  const applicant1Content = uploadDocumentGenerateContent(content);
  const { courtFeedback } = hubPageContent(content);
  const referenceNumber = formattedCaseId(content.userCase.id);
  const uploadedDocsFilenames = content.userCase.coClarificationUploadDocuments?.map(item => getFilename(item.value));
  const amendable = content.isClarificationAmendableState;
  const uploadContentScript = `{
    "isClarificationAmendableState": ${content.isClarificationAmendableState},
    "delete": "${content.delete}"
  }`;
  return {
    ...applicant1Content,
    ...languages[content.language]({ applicant1Content, ...content }),
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    uploadedDocsFilenames,
    amendable,
    uploadContentScript,
    referenceNumber,
    courtFeedback,
    ...latestLegalAdvisorDecisionContent(userCase),
  };
};
