import { isObject } from 'lodash';

import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { getFilename } from '../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/review-your-response-to-the-courts-feedback/content';
import { APPLICANT_2, RESPOND_TO_COURT_FEEDBACK } from '../../urls';

const labels = (detailsText, uploadedDocsFilenames) => ({
  stepAnswers: {
    yourResponse: `${detailsText}`,
    uploadedFiles: `${uploadedDocsFilenames}`,
  },
});

export const form: FormContent = {
  ...applicant1Form,
  fields: userCase => ({
    app2RfiDraftResponseDetails: {
      type: 'hidden',
      label: l => l.response,
      labelHidden: true,
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
    },
    app2RfiDraftResponseCannotUploadDocs: {
      type: 'hidden',
      values: [],
    },
  }),
};

export const generateContent: TranslationFn = content => {
  const uploadedDocsFilenames = content.userCase.app2RfiDraftResponseDocs?.map(item => getFilename(item.value));
  const detailsText = content.userCase.app2RfiDraftResponseDetails;
  const cannotUploadDocs =
    content.userCase.app2RfiDraftResponseCannotUploadDocs === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
  const changeUrl = APPLICANT_2 + RESPOND_TO_COURT_FEEDBACK;
  return {
    ...applicant1GenerateContent(content),
    ...labels(detailsText, uploadedDocsFilenames),
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    detailsText,
    uploadedDocsFilenames,
    cannotUploadDocs,
    changeUrl,
  };
};
