import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'You were signed out to protect your privacy',
  line1: 'Your application was inactive for more than 20 minutes so you were signed out.',
  line2: 'Your progress was saved.',
  signBackInAndContinue: 'Sign back in and continue',
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
