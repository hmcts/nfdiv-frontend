import type { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';

const en = () => ({
  title: 'Withdraw your application',
  line1: 'Your application will be withdrawn, and you will lose access to the case.',
  line2: 'If you still want to get divorced, you will need to start a new application.',
  withdrawApplication: "Withdraw application"
});

const cy: typeof en = () => ({
  title: 'Withdraw your application',
  line1: 'Your application will be withdrawn, and you will lose access to the case.',
  line2: 'If you still want to get divorced, you will need to start a new application.',
  withdrawApplication: "Withdraw application"
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.withdrawApplication,
    classes: "govuk-button govuk-button--warning"
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return { 
    ...languages[content.language](),
    form
  };
};
