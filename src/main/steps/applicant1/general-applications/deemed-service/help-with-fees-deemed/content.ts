import config from 'config';

import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';

const en = () => ({
  title: 'Help with fees',
  line1: `The cost of this deemed service application is £58. You can <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">check the help with fees guidance on GOV.UK (opens in a new tab)</a> to find out if you are eligible for support.`,
  useHelpWithFees: 'Will you be using help with fees to pay for this application?',
});

// @TODO translations
const cy = () => ({
  title: 'Help with fees',
  line1: `The cost of this deemed service application si £58. You can <a class="govuk-link" target="_blank" href="${config.get(
    'govukUrls.getHelpWithCourtFees'
  )}">check the hlep with fees guidance on GOV.UK (opens in a new tab)</a> to find out if you are eligible for support.`,
  useHelpWithFees: 'Will you be using help with fees to pay for this application?',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DeemedUseHelpWithFees: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.useHelpWithFees,
      labelHidden: false,
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
