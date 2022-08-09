import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant1GenerateContent } from '../../applicant1/review-the-application/content';
import { checkboxToBoolean } from '../../common/content.utils';

export const CONFIRM_READ_PETITION_ID = 'confirmReadPetitionId';

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
            id: CONFIRM_READ_PETITION_ID,
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
