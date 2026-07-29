import type { TranslationFn } from '../../app/controller/GetController.js';

const en = () => ({
  title: 'Contact us',
});

const cy: typeof en = () => ({
  title: 'Cysylltu â ni',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
