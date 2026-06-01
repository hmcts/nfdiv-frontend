import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant1GenerateContent } from '../../applicant1/review-the-application/content';
import { checkboxToBoolean } from '../../common/content.utils';

const en = () => ({
  changesToDetails:
    'If any of your contact details are incorrect, you will be able to update them after you confirm that you have read the application.',
});

//TODO: Welsh translation required
const cy = () => ({
  changesToDetails:
    'If any of your contact details are incorrect, you will be able to update them after you confirm that you have read the application.',
});

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

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();

  return {
    ...translations,
    ...applicant1GenerateContent(content),
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
