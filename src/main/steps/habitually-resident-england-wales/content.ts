import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'Were you both last habitually resident in England or Wales and does one of you still live here?',
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
