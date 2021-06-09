import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn, isValidAccessCode, isValidReferenceNumber } from '../../app/form/validation';

const en = () => ({
  title: 'Enter your access details',
  line1: 'Your reference number and access code are in the email you received which invited you to this application.',
  referenceNumber: 'Your reference number',
  referenceNumberHint: 'This is a 16-digit number',
  accessCode: 'Your access code',
  accessCodeHint: 'This is 8 characters',
  noAccessCode: 'I do not know my access details',
  errors: {
    referenceNumber: {
      required:
        'You have not entered a reference number. Enter the reference number from the email you received before continuing.',
      invalid: 'You have entered an invalid reference number. Check your email and enter it again before continuing.',
      invalidReference:
        'You have entered the wrong reference number. Check your email and enter it again before continuing.',
    },
    accessCode: {
      required:
        'You have not entered an access code. Enter the access code from the email you received before continuing.',
      invalid: 'You have entered an invalid access code. Check your email and enter it again before continuing.',
      invalidAccessCode:
        'You have entered the wrong access code. Check your email and enter it again before continuing.',
    },
  },
});

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    applicant2ReferenceNumber: {
      type: 'text',
      label: l => l.referenceNumber,
      hint: l => l.referenceNumberHint,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      validator: input => isFieldFilledIn(input) || isValidReferenceNumber(input),
    },
    applicant2AccessCode: {
      type: 'text',
      label: l => l.accessCode,
      hint: l => l.accessCodeHint,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      validator: input => isFieldFilledIn(input) || isValidAccessCode(input),
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
