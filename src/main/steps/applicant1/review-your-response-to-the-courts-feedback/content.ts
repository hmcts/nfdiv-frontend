import { isObject } from 'lodash';

import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { getFilename } from '../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import * as urls from '../../urls';
import { RESPOND_TO_COURT_FEEDBACK } from '../../urls';

const en = (detailsText, uploadedDocsFilenames) => ({
  title: 'Review your response',
  line1: 'Review your response before submitting',
  noFilesUploaded: 'No files uploaded',
  notProvided: 'Not provided',
  havingTroubleUploading: "I'm having trouble uploading some or all of my documents",
  stepQuestions: {
    yourResponse: 'Your response',
    uploadedFiles: 'Uploaded files',
  },
  stepAnswers: {
    yourResponse: `${detailsText}`,
    uploadedFiles: `${uploadedDocsFilenames}`,
  },
  stepLinks: {
    yourResponse: `${urls.RESPOND_TO_COURT_FEEDBACK}#responseHeading`,
    uploadedFiles: `${urls.RESPOND_TO_COURT_FEEDBACK}#uploadAFile`,
  },
});

const cy: typeof en = (detailsText, uploadedDocsFilenames) => ({
  title: 'Adolygu eich ymateb',
  line1: 'Adolygu eich ymateb cyn cyflwyno',
  noFilesUploaded: 'Nid oes ffeiliau wedi cael eu llwytho',
  notProvided: 'Dim byd wedi ei ddarparu',
  havingTroubleUploading: 'Rwyf yn cael trafferth wrth lwytho rhai neu’r cyfan o fy nogfennau.',
  stepQuestions: {
    yourResponse: 'Eich ymateb',
    uploadedFiles: 'Ffeiliau sydd wedi cael eu llwytho',
  },
  stepAnswers: {
    yourResponse: `${detailsText}`,
    uploadedFiles: `${uploadedDocsFilenames}`,
  },
  stepLinks: {
    yourResponse: `${urls.RESPOND_TO_COURT_FEEDBACK}#responseHeading`,
    uploadedFiles: `${urls.RESPOND_TO_COURT_FEEDBACK}#uploadAFile`,
  },
});

export const form: FormContent = {
  fields: userCase => ({
    app1RfiDraftResponseDetails: {
      type: 'hidden',
      label: l => l.response,
      labelHidden: true,
    },
    app1RfiDraftResponseUploadedFiles: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
      value:
        (isObject(userCase.app1RfiDraftResponseUploadedFiles)
          ? JSON.stringify(userCase.app1RfiDraftResponseUploadedFiles)
          : userCase.app1RfiDraftResponseUploadedFiles) || '[]',
      parser: data => JSON.parse((data as Record<string, string>).app1RfiDraftResponseUploadedFiles || '[]'),
    },
    app1RfiDraftResponseCannotUploadDocs: {
      type: 'hidden',
      values: [],
    },
  }),
  submit: {
    text: l => l.submit,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const uploadedDocsFilenames = content.userCase.app1RfiDraftResponseDocs?.map(item => getFilename(item.value));
  const detailsText = content.userCase.app1RfiDraftResponseDetails;
  const cannotUploadDocs =
    content.userCase.app1RfiDraftResponseCannotUploadDocs === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
  const changeUrl = RESPOND_TO_COURT_FEEDBACK;
  return {
    ...languages[content.language](detailsText, uploadedDocsFilenames),
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    detailsText,
    uploadedDocsFilenames,
    cannotUploadDocs,
    changeUrl,
  };
};
