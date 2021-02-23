import { Checkbox, Gender } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { commonContent } from '../../common/common.content';

export const generateContent: TranslationFn = ({ isDivorce }) => {
  const en = {
    title: isDivorce ? 'Who are you applying to divorce?' : 'Are you male or female?',
    male: isDivorce ? 'My husband' : 'Male',
    female: isDivorce ? 'My wife' : 'Female',
    sameSex: 'Select the following if it applies to you:',
    sameSexOption: `We were a same-sex couple when we ${isDivorce ? 'got married' : 'formed our civil partnership'}`,
    errors: {
      partnerGender: {
        required: commonContent.en.required,
      },
    },
  };

  // @TODO translations
  const cy: typeof en = {
    ...en,
    errors: {
      partnerGender: {
        required: commonContent.cy.required,
      },
    },
  };

  const common = {
    form,
  };

  return { en, cy, common };
};

export const form: FormContent = {
  fields: {
    partnerGender: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      values: [
        { label: l => l.male, value: Gender.Male },
        { label: l => l.female, value: Gender.Female },
      ],
      validator: value => isFieldFilledIn(value),
    },
    sameSex: {
      type: 'checkboxes',
      label: l => l.sameSex,
      values: [{ label: l => l.sameSexOption, value: Checkbox.Checked }],
    },
  },
  submit: {
    text: l => l.continue,
  },
};
