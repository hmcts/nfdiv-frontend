import { isEmpty } from 'lodash';

import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

const en = () => ({
  title: 'Tell us about your evidence',
  line1:
    "Give as much detail as you can. The judge needs to be satisfied that your partner has received the papers before they can grant your application. If your upload does not show the date you'll need to explain when you got it.",
  errors: {
    applicant1DeemedEvidenceDetails: {
      required: 'You have not provided any information. You need to provide the information the court has requested.',
    },
  },
});

const cy: typeof en = () => ({
  title: 'Tell us about your evidence',
  line1:
    "Give as much detail as you can. The judge needs to be satisfied that your partner has received the papers before they can grant your application. If your upload does not show the date you'll need to explain when you got it.",
  errors: {
    applicant1DeemedEvidenceDetails: {
      required: 'You have not provided any information. You need to provide the information the court has requested.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1DeemedEvidenceDetails: {
      type: 'textarea',
      classes: 'govuk-input--width-40',
      label: l => l.responseLabel,
      validator: (value) => {
        const hasEnteredDetails = !isEmpty(value);
        if (!hasEnteredDetails) {
          return 'required';
        }
      },
    },
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
    form,
  };
};
