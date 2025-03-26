import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isPhoneNoValid } from '../../../app/form/validation';

const en = ({ partner }) => ({
  title: 'Your phone number',
  line1: `Enter your phone number so court staff can contact you quickly, if they need to. You can choose to keep your phone number private from your ${partner} later in this application.`,
  enterPhoneNumber: 'Enter your phone number (optional)',
  errors: {
    applicant1PhoneNumber: {
      invalid: 'The phone number you have entered is invalid. Enter a valid phone number to continue.',
    },
  },
});

// @TODO translations
const cy = ({ partner }) => ({
  title: 'Eich rhif ffôn',
  line1: `Rhowch eich rhif ffôn fel y gall staff y llys gysylltu â chi'n gyflym os oes angen. Gallwch ddewis i gadw eich rhif ffôn yn breifat oddi wrth eich ${partner} yn ddiweddarach yn y cais hwn.`,
  enterPhoneNumber: 'Rhowch eich rhif ffôn (dewisol)',
  errors: {
    applicant1PhoneNumber: {
      invalid: 'Nid yw’r rhif ffôn rydych wedi ei deipio yn ddilys. Rhowch rif ffôn dilys i barhau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1PhoneNumber: {
      type: 'tel',
      label: l => l.enterPhoneNumber,
      labelSize: 's',
      classes: 'govuk-input govuk-input--width-20',
      validator: isPhoneNoValid,
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
