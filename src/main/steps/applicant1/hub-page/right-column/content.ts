import { TranslationFn } from '../../../../app/controller/GetController';

const en = () => ({
  iWantTo: 'I want to...',
  gettingHelp: 'Getting help',
});

// @TODO translations
const cy: typeof en = () => ({
  iWantTo: 'Rwyf eisiau...',
  gettingHelp: 'Cael help',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
