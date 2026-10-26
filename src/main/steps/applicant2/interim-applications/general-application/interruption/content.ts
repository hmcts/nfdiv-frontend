import { Checkbox } from '../../../../../app/case/case';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../../../applicant1/interim-applications/general-application/interruption/content';

const labels = content => ({
  errors: {
    applicant2GeneralApplicationAcknowledgementCheckbox:
      content.errors.applicant1GeneralApplicationAcknowledgementCheckbox,
  },
});

const applicant1FormFields = applicant1Form.fields as FormFields;

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2GeneralApplicationAcknowledgementCheckbox: {
      ...applicant1FormFields.applicant1GeneralApplicationAcknowledgementCheckbox,
      values: [
        {
          name: 'applicant2GeneralApplicationAcknowledgementCheckbox',
          label: l => l.iUnderstand,
          value: Checkbox.Checked,
        },
      ],
    },
  },
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(applicant1Content),
    form,
  };
};
