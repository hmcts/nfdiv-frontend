import type { TranslationFn } from '../../app/controller/GetController';

const en = () => ({
  title: 'Contact us',
});

const cy: typeof en = () => ({
  title: 'Cysylltwch â ni',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
