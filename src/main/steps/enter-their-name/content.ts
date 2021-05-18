import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../app/form/validation';
import { CommonContent } from '../../steps/common/common.content';

const en = ({ applicant2 }: CommonContent) => {
  const invalid = 'You have entered an invalid character, like a number. Enter their name using letters only.';
  return {
    title: `Enter your ${applicant2}’s name`,
    line1: `The court needs to know your ${applicant2}’s full name.`,
    firstNames: `Your ${applicant2}’s first name(s)`,
    middleNames: `Your ${applicant2}’s middle name(s)`,
    lastNames: `Your ${applicant2}’s last name(s)`,
    errors: {
      applicant2FirstNames: {
        required: 'You have not entered their first name. Enter it before continuing.',
        invalid,
      },
      applicant2MiddleNames: {
        invalid,
      },
      applicant2LastNames: {
        required: 'You have not entered their last name. Enter it before continuing.',
        invalid,
      },
    },
  };
};

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    applicant2FirstNames: {
      type: 'text',
      label: l => l.firstNames,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      validator: input => isFieldFilledIn(input) || isFieldLetters(input),
    },
    applicant2MiddleNames: {
      type: 'text',
      label: l => l.middleNames,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      validator: isFieldLetters,
    },
    applicant2LastNames: {
      type: 'text',
      label: l => l.lastNames,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      validator: input => isFieldFilledIn(input) || isFieldLetters(input),
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
