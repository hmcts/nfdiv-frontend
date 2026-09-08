import { TranslationFn } from '../../app/controller/GetController';

const en = () => ({
  title: 'Your application has been saved',
  applicationSentTo: "We've emailed you a link to continue your application.",
  applicationSavedFor6Months:
    "While you're filling out or responding to an application we will hold your data for up to 6 months. If you do not complete the application during this time you'll have to start again.",
  beenSignedOut: 'You have been signed out.',
  signBackIn: 'Sign back in and continue',
});

const cy: typeof en = () => ({
  title: 'Mae eich cais wedi cael ei gadw',
  applicationSentTo: "Rydym wedi anfon dolen atoch drwy e-bost i barhau â'ch cais.",
  applicationSavedFor6Months:
    "Tra byddwch yn llenwi neu'n ymateb i gais byddwn yn cadw eich data am hyd at 6 mis. Os na fyddwch yn cwblhau’r cais yn ystod yr amser hwn, bydd rhaid ichi ddechrau eto.",
  beenSignedOut: 'Rydych wedi cael eich allgofnodi.',
  signBackIn: 'Mewngofnodi eto a pharhau',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return {
    ...languages[content.language](),
  };
};
