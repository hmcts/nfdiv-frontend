import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import {
  form as applicant2Form,
  generateContent as applicant2GenerateContent,
} from '../../applicant2/details-other-proceedings/content';

export const form: FormContent = {
  ...applicant2Form,
  fields: {
    ...applicant2Form.fields,
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
  },
};

export const generateContent: TranslationFn = content => {
  const applicant2Content = applicant2GenerateContent(content);
  return {
    ...applicant2Content,
    form,
  };
};
