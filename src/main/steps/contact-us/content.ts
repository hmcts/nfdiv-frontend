import type { TranslationFn } from '../../app/controller/GetController';

const en = () => ({
  title: 'Contact us',
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
