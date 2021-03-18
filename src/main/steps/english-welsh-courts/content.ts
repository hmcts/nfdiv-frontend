import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'You can use English or Welsh courts to get a divorce',
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
