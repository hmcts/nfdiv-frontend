import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'Interstitial',
};

const cy: typeof en = {
  ...en,
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
