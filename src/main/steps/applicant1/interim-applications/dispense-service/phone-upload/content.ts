import { isObject } from 'lodash';

import { Checkbox } from '../../../../../app/case/case';
import { DocumentType } from '../../../../../app/case/definition';
import { getFileMapByDocumentType } from '../../../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';
import { generateContent as uploadEvidenceGenerateContent } from '../../common/upload-evidence/content';

const errors = content => ({
  errors: {
    applicant1DispensePhoneNumberEvidence: {
      notUploaded: content.errors.applicant1InterimAppsEvidenceUploadedFiles.notUploaded,
      errorUploading: content.errors.applicant1InterimAppsEvidenceUploadedFiles.errorUploading,
      fileSizeTooBig: content.errors.applicant1InterimAppsEvidenceUploadedFiles.fileSizeTooBig,
      fileWrongFormat: content.errors.applicant1InterimAppsEvidenceUploadedFiles.fileWrongFormat,
    },
  },
});

const en = ({ partner }: CommonContent) => ({
  title: 'Telephone Numbers',
  partnerPhoneNumbersDescription: `Tell us the phone numbers and any previous contact you've had. Explain what attempts you have made to contact your ${partner} on these phone numbers.`,
  uploadSupportingDocuments: 'Upload supporting documents (optional)',
  errors: {
    applicant1DispensePartnerPhoneNumbers: {
      required: `Enter your ${partner}'s phone numbers and explain any attempts you've made to contact them`,
    },
  },
});

const cy: typeof en = ({ partner }: CommonContent) => ({
  title: 'Telephone Numbers',
  partnerPhoneNumbersDescription: `Tell us the phone numbers and any previous contact you've had. Explain what attempts you have made to contact your ${partner} on these phone numbers.`,
  uploadSupportingDocuments: 'Upload supporting documents (optional)',
  errors: {
    applicant1DispensePartnerPhoneNumbers: {
      required: `Enter your ${partner}'s phone numbers and explain any attempts you've made to contact them`,
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: userCase => ({
    applicant1DispensePartnerPhoneNumbers: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.partnerPhoneNumbersDescription,
      labelHidden: false,
      validator: value => isFieldFilledIn(value),
    },
    applicant1DispensePhoneNumberEvidence: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
      value:
        (isObject(userCase.applicant1DispensePhoneNumberEvidence)
          ? JSON.stringify(userCase.applicant1DispensePhoneNumberEvidence)
          : userCase.applicant1DispensePhoneNumberEvidence) || '[]',
      parser: data => JSON.parse((data as Record<string, string>).applicant1DispensePhoneNumberEvidence || '[]'),
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
  const translations = languages[content.language](content);
  content.userCase.applicant1InterimAppsTempDocUploadType = DocumentType.DISPENSE_PHONE_NUMBER_EVIDENCE;

  const filesToDisplay = getFileMapByDocumentType(
    content.userCase.applicant1InterimAppsEvidenceDocs,
    DocumentType.DISPENSE_PHONE_NUMBER_EVIDENCE
  );

  return {
    ...applicant1UploadEvidenceContent,
    ...errors(applicant1UploadEvidenceContent),
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    hideUploadAFile: true,
    filesToDisplay,
    useFilesToDisplay: true,
  };
};
