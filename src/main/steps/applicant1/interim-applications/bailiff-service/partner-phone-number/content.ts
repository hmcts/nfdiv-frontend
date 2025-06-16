import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isPhoneNoValid } from '../../../../../app/form/validation';

const en = () => ({
  title: "Do you know your partner's phone number?",
  enterPhoneNumber: "Enter your partner's phone number",
  enterPhoneNumberHint: 'For international numbers include the country code, for example +33 1234 567890',
  errors: {
    applicant1BailiffKnowPartnersPhone: {
      required: 'You must select an option.',
    },
    applicant1BailiffPartnersPhone: {
      required: "Please enter your partner's phone number.",
      invalid: 'Please enter a valid phone number.',
    },
  },
});

const cy: typeof en = () => ({
  title: "Do you know your partner's phone number?",
  enterPhoneNumber: "Enter your partner's phone number",
  enterPhoneNumberHint: 'For international numbers include the country code, for example +33 1234 567890',
  errors: {
    applicant1BailiffKnowPartnersPhone: {
      required: 'You must select an option.',
    },
    applicant1BailiffPartnersPhone: {
      required: "Please enter your partner's phone number.",
      invalid: 'Please enter a valid phone number.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1BailiffKnowPartnersPhone: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            applicant1BailiffPartnersPhone: {
              type: 'text',
              classes: 'govuk-input--width-10',
              label: l => l.enterPhoneNumber,
              hint: l => l.enterPhoneNumberHint,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
            },
          },
        },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
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
