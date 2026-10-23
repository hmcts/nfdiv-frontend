import { Checkbox } from '../../../app/case/case.js';
import { TranslationFn } from '../../../app/controller/GetController.js';
import { FormContent } from '../../../app/form/Form.js';
import { isFieldFilledIn } from '../../../app/form/validation.js';
import { generateContent as applicant1GenerateContent } from '../../applicant1/check-your-conditional-order-answers/content.js';
import { DISABLE_UPON_SUBMIT } from '../../common/content.utils.js';

const labels = content => {
  return {
    errors: {
      coApplicant2StatementOfTruth: {
        ...content.errors.coApplicant1StatementOfTruth,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    coApplicant2StatementOfTruth: {
      type: 'checkboxes',
      label: l => l.confirmBeforeSubmit,
      labelSize: 'm',
      values: [
        {
          name: 'coApplicant2StatementOfTruth',
          label: l => l.confirmApplicationIsTrue,
          hint: l => l.confirmApplicationIsTrueHint,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
  },
  submit: {
    text: l => l.submit,
    classes: DISABLE_UPON_SUBMIT,
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
