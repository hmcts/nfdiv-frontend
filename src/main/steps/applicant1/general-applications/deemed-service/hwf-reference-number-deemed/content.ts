import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => ({
  title: 'Do you have a help with fees reference number?',
  line1:
    "Your reference number must be unique to this deemed service application. You cannot use a reference number you've used for a previous application.",
});

// @TODO translations
const cy = () => ({
  title: 'Do you have a help with fees reference number?',
  line1:
    "Your reference number must be unique to this deemed service application. You cannot use a reference number you've used for a previous application.",
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DeemedHaveHwfReference: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          id: 'no',
          value: YesOrNo.NO,
        },
      ],
      validator: value => isFieldFilledIn(value),
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
