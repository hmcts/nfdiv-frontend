import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isPhoneNoValid } from '../../../app/form/validation';

const en = ({ partner }) => ({
  title: 'Eich rhif ffôn',
  line1: `Rhowch eich rhif ffôn fel y gall staff y llys gysylltu â chi'n gyflym os oes angen. Gallwch ddewis i gadw eich rhif ffôn yn breifat oddi wrth eich ${partner} yn ddiweddarach yn y cais hwn.`,
  enterPhoneNumber: 'Rhowch eich rhif ffôn (dewisol)',
  errors: {
    applicant1PhoneNumber: {
      invalid: 'Nid yw’r rhif ffôn rydych wedi ei deipio yn ddilys. Rhowch rif ffôn dilys i barhau.',
    },
  },
});

// @TODO translations
const cy = en;

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
