import { isObject } from 'lodash';
import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant2GenerateContent } from '../../applicant2/details-other-proceedings/content';
import { getFilename } from '../../../app/case/formatter/uploaded-files';


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
          label: 'Yes',
          value: YesOrNo.YES,
          conditionalText: l => `<p class="govuk-label">${l.legalProceedingsConcludedEvidence}</p>`,
        },
        {
          label: 'No',
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
    },
    applicant2UnableToUploadEvidence: {
      type: 'checkboxes',
      label: 'test',
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
  const applicant2Content = applicant2GenerateContent(content);
  const uploadedDocsFilenames = content.userCase.applicant2LegalProceedingDocs?.map(item => getFilename(item.value));
  const amendable = content.isAmendableStates;
  const uploadContentScript = `{
    "isAmendableStates": ${content.isAmendableStates},
    "delete": "${content.delete}"
  }`;
  return {
    ...applicant2Content,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
    amendable,
    uploadedDocsFilenames,
    uploadContentScript,
  };
};
