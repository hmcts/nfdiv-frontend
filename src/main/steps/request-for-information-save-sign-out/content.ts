import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'Your response has been saved',
  applicationSentTo: "We've emailed you a link to continue your application.",
  beenSignedOut: 'You have been signed out.',
  signBackIn: 'Sign back in and continue',
};

const cy: typeof en = {
  title: 'Mae eich ymateb wedi’i gadw',
  applicationSentTo: "Rydym wedi anfon dolen atoch drwy e-bost i barhau â'ch cais.",
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
