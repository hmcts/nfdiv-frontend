import { isObject } from 'lodash';

import { Checkbox } from '../../../../../app/case/case';
import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import { getDispenseLogicalTests } from '../../../../dispenseServiceApplicationSequence';
import { generateContent as uploadEvidenceGenerateContent } from '../../common/upload-evidence/content';

const en = ({ partner }: CommonContent) => ({
  statement: {
    header: 'If you have any evidence to support your application, you can upload it now. This may include:',
    options: {
      finalOrderSearch: 'Your no trace certificate (Mandatory)',
      haveEmail: `proof of any attempts you have made to contact your ${partner} on their email addresses (Optional)`,
      havePhone: `proof of any attempts you have made to contact your ${partner} on their phone numbers (Optional)`,
      usedTracingAgent: 'results of the search by a tracing agent (Optional)',
      tracedOnline: 'results of the search online by people finding services (Optional)',
      usedOnlineSearch:
        "results of any online searches you've carried out using search engines or social media platforms (Optional)",
      contactedEmployer: `proof of enquiries with your ${partner}'s last known employer (Optional)`,
      otherEnquiries: 'proof of any other enquiries made (Optional)',
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  statement: {
    header: 'If you have any evidence to support your application, you can upload it now. This may include:',
    options: {
      finalOrderSearch: 'Your no trace certificate (Mandatory)',
      haveEmail: `proof of any attempts you have made to contact your ${partner} on their email addresses (Optional)`,
      havePhone: `proof of any attempts you have made to contact your ${partner} on their phone numbers (Optional)`,
      usedTracingAgent: 'results of the search by a tracing agent (Optional)',
      tracedOnline: 'results of the search online by people finding services (Optional)',
      usedOnlineSearch:
        "results of any online searches you've carried out using search engines or social media platforms (Optional)",
      contactedEmployer: `proof of enquiries with your ${partner}'s last known employer (Optional)`,
      otherEnquiries: 'proof of any other enquiries made (Optional)',
    },
  },
});

const languages = {
  en,
  cy,
};

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
        if (
          !hasUploadedFiles &&
          !selectedCannotUploadDocuments &&
          userCase.applicant1DispenseHaveSearchedFinalOrder === YesOrNo.YES
        ) {
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
        if (
          !hasUploadedFiles &&
          !selectedCannotUploadDocuments &&
          userCase.applicant1DispenseHaveSearchedFinalOrder === YesOrNo.YES
        ) {
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

export const generateContent: TranslationFn = content => {
  const applicant1UploadEvidenceContent = uploadEvidenceGenerateContent(content);
  const translations = languages[content.language](content);
  const dispenseLogic = getDispenseLogicalTests(content.userCase);

  return {
    ...applicant1UploadEvidenceContent,
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    ...dispenseLogic,
  };
};
