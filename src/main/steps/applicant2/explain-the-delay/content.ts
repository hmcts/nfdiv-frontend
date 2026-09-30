import { Checkbox } from '../../../app/case/case.js';
import { TranslationFn } from '../../../app/controller/GetController.js';
import { FormContent } from '../../../app/form/Form.js';
import { isFieldFilledIn } from '../../../app/form/validation.js';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/explain-the-delay/content.js';

const labels = applicant1Content => ({
  errors: {
    applicant2FinalOrderLateExplanation: applicant1Content.errors.applicant1FinalOrderLateExplanation,
    applicant2FinalOrderStatementOfTruth: applicant1Content.errors.applicant1FinalOrderStatementOfTruth,
  },
});

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2FinalOrderLateExplanation: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.finalOrderLateExplanation,
      labelSize: 'normal',
      validator: isFieldFilledIn,
    },
    applicant2FinalOrderStatementOfTruth: {
      type: 'checkboxes',
      values: [
        {
          name: 'applicant2FinalOrderStatementOfTruth',
          label: l => l.finalOrderStatementOfTruth,
          value: Checkbox.Checked,
          selected: false,
          validator: isFieldFilledIn,
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
