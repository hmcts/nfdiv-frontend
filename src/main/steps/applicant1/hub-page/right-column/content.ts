import { TranslationFn } from '../../../../app/controller/GetController';

const en = () => ({
  iWantTo: 'I want to...',
  gettingHelp: 'Getting help',
  moneyAndProperty: 'Find out about dividing money and property',
});

// @TODO translations
const cy: typeof en = () => ({
  iWantTo: 'Rwyf eisiau...',
  gettingHelp: 'Cael help',
  moneyAndProperty: 'Rhagor o wybodaeth am rannu arian ac eiddo',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
