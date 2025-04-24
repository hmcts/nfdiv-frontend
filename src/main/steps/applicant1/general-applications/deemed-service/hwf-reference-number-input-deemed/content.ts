import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isInvalidHelpWithFeesRef } from '../../../../../app/form/validation';

const en = () => ({
  title: 'Enter your Help With Fees reference number',
  refExample: 'For example, HWF-A1B-23C',
  errors: {
    applicant1HelpWithFeesRefNo: {
      required:
        'You need to enter your Help With Fees reference number before continuing. You received this when you applied.',
      invalid: 'You have entered an invalid Help With Fees reference number. Check the number and enter it again.',
      invalidUsedExample:
        'You have entered the example Help With Fees number. Enter the number you were sent before continuing.',
    },
  },
});

const cy: typeof en = () => ({
  title: 'Enter your Help With Fees reference number:',
  refExample: 'For example, HWF-A1B-23C',
  errors: {
    applicant1HelpWithFeesRefNo: {
      required:
        'You need to enter your Help With Fees reference number before continuing. You received this when you applied.',
      invalid: 'You have entered an invalid Help With Fees reference number. Check the number and enter it again.',
      invalidUsedExample:
        'You have entered the example Help With Fees number. Enter the number you were sent before continuing.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1DeemedHwfRefNumber: {
      type: 'text',
      attributes: {
        maxLength: 11,
      },
      classes: 'govuk-!-width-one-third',
      label: '',
      labelHidden: true,
      hint: l => l.refExample,
      validator: isInvalidHelpWithFeesRef,
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
