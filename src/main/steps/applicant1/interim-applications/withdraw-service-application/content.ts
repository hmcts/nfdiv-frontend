import type { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = () => ({
  title: 'Withdraw your service application',
  line1: 'Your service application will be withdrawn, and you will have to make a new application.',
  withdrawApplication: 'Withdraw application',
});

const cy: typeof en = () => ({
  title: 'Tynnu eich cais yn ôl',
  line1: "Bydd eich cais yn cael ei dynnu'n ôl, a bydd yn rhaid i chi wneud cais newydd.",
  withdrawApplication: "Tynnu'r cais yn ôl",
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.withdrawApplication,
    classes: 'govuk-button govuk-button--warning',
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return {
    ...languages[content.language](),
    form,
  };
};
