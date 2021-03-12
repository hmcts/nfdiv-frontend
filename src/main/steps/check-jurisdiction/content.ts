import { TranslationFn } from '../../app/controller/GetController';

// @TODO part of another ticket
const en = {};

// @TODO translations
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
