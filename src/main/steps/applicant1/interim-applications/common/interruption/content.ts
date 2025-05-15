import { Checkbox } from '../../../../../app/case/case';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: '',
  line1: `If your application is successful, we will share your answers and any evidence you provide with your ${partner}.`,
  line2: "We will not share your contact details if you've told us to keep them private.",
  iUnderstand: 'I understand',
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: '',
  line1: `If your application is successful, we will share your answers and any evidence you provide with your ${partner}.`,
  line2: "We will not share your contact details if you've told us to keep them private.",
  iUnderstand: 'I understand',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1InterimAppsIUnderstand: {
      type: 'checkboxes',
      values: [
        {
          name: 'applicant1InterimAppsIUnderstand',
          label: l => l.iUnderstand,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
