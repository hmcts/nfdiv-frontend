import { isObject } from 'lodash';

import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { getFilename } from '../../../app/case/formatter/uploaded-files';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant1GenerateContent } from '../../applicant1/details-other-proceedings/content';

const labels = applicant1Content => ({
  errors: {
    applicant2LegalProceedingsDetails: applicant1Content.errors.applicant1LegalProceedingsDetails,
    applicant2LegalProceedingUploadedFiles: applicant1Content.errors.applicant2LegalProceedingUploadedFiles,
    applicant2UnableToUploadEvidence: applicant1Content.errors.applicant2UnableToUploadEvidence,
    applicant2LegalProceedingsConcluded: applicant1Content.errors.applicant2LegalProceedingsConcluded,
  },
});

export const form: FormContent = {
  fields: userCase => ({
    applicant2LegalProceedingsDetails: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.legalProceedingsDetails,
      labelSize: 'normal',
      validator: isFieldFilledIn,
    },
    applicant2LegalProceedingsConcluded: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.legalProceedingsConcluded,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          conditionalText: l => `<p class="govuk-label">${l.legalProceedingsConcludedEvidence}</p>`,
        },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          conditionalText: l => `<p class="govuk-label">${l.legalProceedingsOngoingEvidence}</p>`,
        },
      ],
      validator: value => isFieldFilledIn(value),
    },
    applicant2LegalProceedingUploadedFiles: {
      type: 'hidden',
      label: l => l.uploadFiles,
      labelHidden: true,
      value:
        (isObject(userCase.applicant2LegalProceedingUploadedFiles)
          ? JSON.stringify(userCase.applicant2LegalProceedingUploadedFiles)
          : userCase.applicant2LegalProceedingUploadedFiles) || '[]',
      parser: data => JSON.parse((data as Record<string, string>).applicant2LegalProceedingUploadedFiles || '[]'),
      validator: (value, formData) => {
        const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.applicant2UnableToUploadEvidence?.length;
        if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
          return 'notUploaded';
        }
      },
    },
    applicant2UnableToUploadEvidence: {
      type: 'checkboxes',
      label: l => l.unableToUploadEvidence,
      labelHidden: true,
      validator: (value, formData) => {
        const hasUploadedFiles =
          (formData.applicant2LegalProceedingUploadedFiles as unknown as string[])?.length &&
          (formData.applicant2LegalProceedingUploadedFiles as unknown as string) !== '[]';
        const selectedCannotUploadDocuments = !!formData.applicant2UnableToUploadEvidence?.length;
        if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
          return 'notUploaded';
        }
      },
      values: [
        {
          name: 'applicant2UnableToUploadEvidence',
          label: l => l.unableToUploadEvidence,
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
  const applicant1Content = applicant1GenerateContent(content);
  const uploadedDocsFilenames = content.userCase.applicant2LegalProceedingDocs?.map(item => getFilename(item.value));
  const amendable = content.isAmendableStates;
  const uploadContentScript = `{
    "isAmendableStates": ${content.isAmendableStates},
    "delete": "${content.delete}"
  }`;
  return {
    ...applicant1Content,
    ...labels(applicant1Content),
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    amendable,
    uploadedDocsFilenames,
    uploadContentScript,
  };
};
