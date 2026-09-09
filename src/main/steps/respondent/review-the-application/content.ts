import { Checkbox } from '../../../app/case/case.js';
import { TranslationFn } from '../../../app/controller/GetController.js';
import { FormContent, FormFieldsFn } from '../../../app/form/Form.js';
import { isFieldFilledIn } from '../../../app/form/validation.js';
import { generateContent as applicant1GenerateContent } from '../../applicant1/review-the-application/content.js';
import { checkboxToBoolean } from '../../common/content.utils.js';

export const form: FormContent = {
  fields: userCase => {
    const shouldDisableCheckbox = checkboxToBoolean(userCase.confirmReadPetition);
    return {
      confirmReadPetition: {
        type: 'checkboxes',
        labelHidden: true,
        values: [
          {
            name: 'confirmReadPetition',
            id: 'confirmReadPetitionId',
            label: l => l.confirmReadPetition,
            attributes: shouldDisableCheckbox ? { disabled: true } : {},
            selected: shouldDisableCheckbox,
            value: Checkbox.Checked,
            validator: isFieldFilledIn,
          },
        ],
      },
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  return {
    ...applicant1GenerateContent(content),
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
