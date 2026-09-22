import { Checkbox } from '../../../app/case/case.js';
import { TranslationFn } from '../../../app/controller/GetController.js';
import { FormContent } from '../../../app/form/Form.js';
import { isFieldFilledIn } from '../../../app/form/validation.js';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/how-to-finalise/content.js';

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2IntendsToSwitchToSole: {
      type: 'checkboxes',
      labelHidden: true,
      values: [
        {
          name: 'applicant2IntendsToSwitchToSole',
          label: l => l.confirmIntendToSwitchToSoleFo,
          value: Checkbox.Checked,
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
    form,
  };
};
