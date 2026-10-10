import type { TranslationFn } from '../../../../../app/controller/GetController';

const en = () => ({
  title: 'Application withdrawn',
  line1: 'Your application has been withdrawn.',
  line2: 'You can make another application to the court at any time.',
  returnToHub: 'Return to hub screen',
});

const cy: typeof en = () => ({
  title: 'Application withdrawn',
  line1: 'Your application has been withdrawn.',
  line2: 'You can make another application to the court at any time.',
  returnToHub: 'Dychwelyd i sgrin yr hwb',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
