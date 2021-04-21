import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { CommonContent } from '../common/common.content';

const en = ({ isDivorce, partner, wantToClaimCosts }: CommonContent) => ({
  title: `Pay your ${isDivorce ? 'divorce' : 'ending your civil partnership'} fee`,
  line1: `The ${
    isDivorce ? 'divorce' : 'ending your civil partnership'
  } application fee is £550. Your application will not be submitted to the court until you have paid.`,
  line2:
    'You’ll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready.',
  line3: `${
    wantToClaimCosts
      ? `You have said you want to claim the costs for ${
          isDivorce ? 'your divorce' : 'ending your civil partnership'
        } from your ${partner}. The £550 application fee will be considered as part of the claim.`
      : ''
  }`,
  continue: 'Pay and submit application',
});

const cy = en;

export const form: FormContent = {
  fields: {},
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
