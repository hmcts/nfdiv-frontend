import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../app/form/validation';

const en = ({ isDivorce, relationship, partner }) => ({
  title: `Your names on your ${relationship} certificate`,
  line1: `These are the names you and your ${partner} used before you ${
    isDivorce ? 'were married' : 'formed your civil partnership'
  }. They can sometimes be different from your current names. For example, if you or your ${partner} had a maiden name.`,
  warningText: `Copy the ${relationship} certificate exactly. For example, if it says ‘Sarah Brown (formerly known as Sarah Smith)’, then enter that.`,
  fullNameOnCertificate: `Copy your full name from the ${relationship} certificate`,
  partnersFullNameOnCertificate: `Copy your ${partner} full name from the ${relationship} certificate`,
  hint: 'Include all the text related to the name',
  errors: {
    fullNameOnCertificate: {
      required: 'You have not entered anything. Enter your full name as it appears on your marriage certificate',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
    partnersFullNameOnCertificate: {
      required: 'You have not entered anything. Enter their full name as it appears on your marriage certificate',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
  },
});

const cy = ({ isDivorce, relationship, partner }) => ({
  ...en({ isDivorce, relationship, partner }),
});

export const form: FormContent = {
  fields: {
    fullNameOnCertificate: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.fullNameOnCertificate,
      hint: l => l.hint,
      validator: value => isFieldFilledIn(value) || isFieldLetters(value),
    },
    partnersFullNameOnCertificate: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.partnersFullNameOnCertificate,
      hint: l => l.hint,
      validator: value => isFieldFilledIn(value) || isFieldLetters(value),
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
  const relationship = content.isDivorce ? content.marriage : content.civilPartnership;
  const translations = languages[content.language]({ ...content, relationship });
  return {
    ...translations,
    form,
  };
};
