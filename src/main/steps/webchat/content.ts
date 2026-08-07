import type { TranslationFn } from '../../app/controller/GetController.js';

const en = () => ({
  title: 'Webchat',
});

const cy: typeof en = () => ({
  title: 'Sgwrsio dros y we',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
