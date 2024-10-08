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
  title: 'Yn talu eich Ffi Gorchymyn Terfynol',
  line1: `Y ffi cais am Orchymyn Terfynol yw ${getFee(
    config.get('fees.finalOrderApplicationFee')
  )}. Ni fydd eich cais yn cael ei gyflwyno i’r Llys nes i chi dalu.`,
  line2:
    'Bydd angen cerdyn debyd neu gredyd dilys arnoch. Os na allwch dalu nawr, arbedwch y cais, a dychwelwch ato pan fyddwch yn barod.',
  continue: "Talu a chyflwyno'r cais",
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
