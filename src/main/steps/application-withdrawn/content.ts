import type { TranslationFn } from '../../app/controller/GetController';

const en = () => ({
  title: 'Application Withdrawn',
  form: {
    submit: {
      text: "Withdraw Draft"
    }
  }
});

const cy: typeof en = () => ({
  title: 'Cysylltu â ni',
  form: {
    submit: {
      text: "Withdraw Draft"
    }
  }
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return { hideWithdraw: true, ...languages[content.language](), form: false };
};
