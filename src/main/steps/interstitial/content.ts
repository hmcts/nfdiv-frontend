import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'You can use the English or Welsh court....',
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
