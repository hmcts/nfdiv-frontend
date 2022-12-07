import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../../app/form/validation';

const en = () => {
  const invalid = 'You have entered an invalid character, like a number. Enter your name using letters only.';
  return {
    title: 'Enter your name',
    line1: 'The court needs to know your full name.',
    insetText: 'You must enter your middle name if you have one.',
    firstNames: 'Your first name(s)',
    middleNames: 'Your middle name(s) (if you have one)',
    lastNames: 'Your last name(s)',
    errors: {
      applicant1FirstNames: {
        required: 'You have not entered your first name. Enter it before continuing.',
        invalid,
      },
      applicant1MiddleNames: {
        invalid,
      },
      applicant1LastNames: {
        required: 'You have not entered your last name. Enter it before continuing.',
        invalid,
      },
    },
  };
};

const cy: typeof en = () => {
  const invalid = 'Rydych wedi teipio nod annilys, fel rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.';
  return {
    title: 'Nodwch eich enw',
    line1: 'Mae’r llys angen gwybod eich enw llawn.',
    insetText: 'You must enter your middle name if you have one.',
    firstNames: 'Eich enw(au) cyntaf',
    middleNames: 'Eich enw(au) canol (os oes gennych un)',
    lastNames: 'Eich cyfenw(au)',
    errors: {
      applicant1FirstNames: {
        required: 'Nid ydych wedi nodi’ch enw cyntaf. Nodwch ef cyn parhau.',
        invalid,
      },
      applicant1MiddleNames: {
        invalid,
      },
      applicant1LastNames: {
        required: 'Nid ydych wedi nodi’ch cyfenw. Nodwch ef cyn parhau.',
        invalid,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1FirstNames: {
      type: 'text',
      label: l => l.firstNames,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      autocomplete: 'given-name',
      validator: input => isFieldFilledIn(input) || isFieldLetters(input),
    },
    applicant1MiddleNames: {
      type: 'text',
      label: l => l.middleNames,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      autocomplete: 'middle-name',
      validator: isFieldLetters,
    },
    applicant1LastNames: {
      type: 'text',
      label: l => l.lastNames,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      autocomplete: 'last-name',
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
