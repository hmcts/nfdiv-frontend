import { Checkbox } from '../../../app/case/case.js';
import { TranslationFn } from '../../../app/controller/GetController.js';
import { FormContent } from '../../../app/form/Form.js';
import { isFieldFilledIn } from '../../../app/form/validation.js';
import { generateContent as applicant1GenerateContent } from '../../applicant1/finalising-your-application/content.js';
import { DISABLE_UPON_SUBMIT } from '../../common/content.utils.js';

const labels = content => ({
  errors: {
    doesApplicant2WantToApplyForFinalOrder: content.errors.doesApplicant1WantToApplyForFinalOrder,
  },
});

export const form: FormContent = {
  fields: {
    doesApplicant2WantToApplyForFinalOrder: {
      type: 'checkboxes',
      label: l => l.confirmBeforeSubmit,
      labelSize: 'm',
      values: [
        {
          name: 'doesApplicant2WantToApplyForFinalOrder',
          label: l => l.checkboxLine,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
          selected: false,
        },
      ],
    },
  },
  submit: {
    text: l => l.continue,
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
