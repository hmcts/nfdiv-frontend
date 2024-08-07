import config from 'config';

import { TranslationFn } from '../../../app/controller/GetController';
import { getFee } from '../../../app/fees/service/get-fee';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  title: 'Pay your Final Order fee',
  line1: `The Final Order application is ${getFee(
    config.get('fees.finalOrderApplicationFee')
  )}. Your application will not be submitted to the Court until you have paid.`,
  line2:
    'You’ll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready.',
  continue: 'Pay and submit application',
});

const cy: typeof en = () => ({
  title: 'Pay your Final Order fee',
  line1: `The Final Order application is ${getFee(
    config.get('fees.finalOrderApplicationFee')
  )}. Your application will not be submitted to the Court until you have paid.`,
  line2:
    'You’ll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready.',
  continue: 'Pay and submit application',
});

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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
