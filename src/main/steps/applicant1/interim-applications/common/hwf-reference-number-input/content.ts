import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isInvalidHelpWithFeesRef } from '../../../../../app/form/validation';

const en = () => ({
  title: 'Enter your Help With Fees reference number',
  refExample: 'For example, HWF-A1B-23C',
  errors: {
    applicant1InterimAppsHwfRefNumber: {
      required: 'You must enter your Help With Fees reference number before continuing.',
      invalid: 'You must enter a valid Help With Fees reference number.',
      invalidUsedExample:
        'You have entered the example Help With Fees number. Enter the number you were sent before continuing.',
    },
  },
});

const cy: typeof en = () => ({
  title: 'Enter your Help With Fees reference number:',
  refExample: 'For example, HWF-A1B-23C',
  errors: {
    applicant1InterimAppsHwfRefNumber: {
      required: 'You must enter your Help With Fees reference number before continuing.',
      invalid: 'You must enter a valid Help With Fees reference number.',
      invalidUsedExample:
        'You have entered the example Help With Fees number. Enter the number you were sent before continuing.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1InterimAppsHwfRefNumber: {
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
