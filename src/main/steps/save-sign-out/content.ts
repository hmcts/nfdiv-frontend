import { TranslationFn } from '../../app/controller/GetController';

const en = ({ isDivorce }) => ({
  title: 'Your application has been saved',
  applicationSentTo: 'A link to your application has been sent to:',
  applicationSavedFor6Months: `While you're filling out or responding to a ${
    isDivorce ? 'divorce' : 'ending a civil partnership'
  } application we will hold your data for up to 6 months. If you do not complete the application during this time you'll have to start again.`,
  beenSignedOut: 'You have been signed out.',
  signBackIn: 'Sign back in and continue',
});

const cy: typeof en = ({ isDivorce }) => ({
  title: 'Mae eich cais wedi cael ei gadw',
  applicationSentTo: 'Anfonwyd dolen sy’n arwain at eich cais i:',
  applicationSavedFor6Months: `Tra byddwch yn llenwi neu'n ymateb i gais ${
    isDivorce ? 'am ysgariad' : 'i ddiddymu partneriaeth sifil'
  } byddwn yn cadw eich data am hyd at 6 mis. Os na fyddwch yn cwblhau’r cais yn ystod yr amser hwn, bydd rhaid ichi ddechrau eto.`,
  beenSignedOut: 'Rydych wedi cael eich allgofnodi.',
  signBackIn: 'Mewngofnodi eto a pharhau',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
