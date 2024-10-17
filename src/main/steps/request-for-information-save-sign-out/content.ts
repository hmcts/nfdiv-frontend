import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'Your response has been saved',
  applicationSentTo: 'A link to your application has been sent to:',
  beenSignedOut: 'You have been signed out.',
  signBackIn: 'Sign back in and continue',
};

const cy: typeof en = {
  title: 'Mae eich ymateb wedi’i gadw',
  applicationSentTo: 'Anfonwyd dolen sy’n arwain at eich cais i:',
  beenSignedOut: 'Rydych wedi cael eich allgofnodi.',
  signBackIn: 'Mewngofnodi eto a pharhau',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
