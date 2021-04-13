import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { CommonContent } from '../common/common.content';

const en = ({ partner, isDivorce, required }: CommonContent) => ({
  title: `Do you want to claim ${
    isDivorce ? 'divorce costs' : 'the costs for ending your civil partnership'
  } from your ${partner}?`,
  line1: `You can ask the court to consider whether your ${partner} should pay some or all of the costs related to ${
    isDivorce ? 'your divorce' : 'ending your civil partnership'
  }. These costs could include the application fee, solicitors fees, or any additional court fees.`,
  line2: 'You do not provide details of the costs now.',
  line3: `This is only asking you about costs relating to ${
    isDivorce ? 'your divorce' : 'ending your civil partnership'
  }. How you divide money and property is dealt with separately.`,
  claimCosts: 'Yes, I want to apply to claim costs',
  doNotClaimCosts: 'No, I do not want to apply to claim costs',
  claimCostsSelected: 'You still need to pay the fee when you submit this application.',
  errors: {
    claimCosts: { required },
  },
});

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    claimCosts: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.claimCosts,
      labelHidden: true,
      values: [
        {
          label: l => l.claimCosts,
          value: YesOrNo.YES,
          conditionalText: l => `<p class="govuk-label govuk-!-font-weight-bold">${l.claimCostsSelected}</p>`,
        },
        { label: l => l.doNotClaimCosts, value: YesOrNo.NO },
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

export const generateContent: TranslationFn = (content: CommonContent) => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
