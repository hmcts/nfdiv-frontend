import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ partner }: CommonContent) => {
  const invalid = 'You have entered an invalid character, like a number. Enter their name using letters only.';
  return {
    title: `Enter your ${partner}’s name`,
    line1: `The court needs to know your ${partner}’s full name.`,
    firstNames: `Your ${partner}’s first name(s)`,
    middleNames: `Your ${partner}’s middle name(s) (if they have one)`,
    lastNames: `Your ${partner}’s last name(s)`,
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

const cy: typeof en = ({ partner }: CommonContent) => {
  const invalid = 'Rydych wedi teipio nod annilys, fel rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig.';
  return {
    title: `Nodwch enw eich ${partner}`,
    line1: `Mae’r llys angen gwybod beth yw enw llawn eich ${partner}.`,
    firstNames: `Enw(au) cyntaf eich ${partner}`,
    middleNames: `Enw(au) canol eich ${partner} (os oes ganddynt un)`,
    lastNames: `Enw(au) olaf eich ${partner}`,
    errors: {
      applicant2FirstNames: {
        required: 'Nid ydych wedi nodi ei enw cyntaf. Nodwch ef cyn parhau.',
        invalid,
      },
      applicant2MiddleNames: {
        invalid,
      },
      applicant2LastNames: {
        required: 'Nid ydych wedi nodi ei enw olaf. Nodwch ef cyn parhau.',
        invalid,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant2FirstNames: {
      type: 'text',
      label: l => l.firstNames,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      autocomplete: 'given-name',
      validator: input => isFieldFilledIn(input) || isFieldLetters(input),
    },
    applicant2MiddleNames: {
      type: 'text',
      label: l => l.middleNames,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      autocomplete: 'middle-name',
      validator: isFieldLetters,
    },
    applicant2LastNames: {
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
