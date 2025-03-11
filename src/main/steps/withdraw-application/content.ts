import type { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';

const en = () => ({
  title: 'Withdraw your application',
  line1: 'Your application will be withdrawn, and you will lose access to the case.',
  line2: 'If you still want to get divorced, you will need to start a new application.',
  withdrawApplication: 'Withdraw application',
});

const cy: typeof en = () => ({
  title: "Tynnu'ch cais yn ôl",
  line1: "Bydd eich cais yn cael ei dynnu'n ôl, a byddwch yn colli mynediad i'r achos.",
  line2: "Os ydych chi'n dal i fod eisiau ysgariad, bydd angen i chi ddechrau cais newydd.",
  withdrawApplication: 'Tynnu cais yn ôl',
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
