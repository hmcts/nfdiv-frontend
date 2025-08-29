import type { TranslationFn } from '../../../../app/controller/GetController';

const en = ({ isDivorce }) => ({
  title: 'Service application withdrawn',
  line1: 'Your service application has been withdrawn.',
  line2: `You can return to your hub screen to view your options to proceed with your ${
    isDivorce ? 'divorce' : 'civil partnership'
  } application.`,
  returnToHub: 'Return to hub screen',
});

const cy: typeof en = ({ isDivorce }) => ({
  title: "Cais wedi'i dynnu'n ôl",
  line1: "Mae eich cais wedi'i dynnu'n ôl.",
  line2: `Gallwch ddychwelyd i’ch sgrin hwb/ cyfrif i weld eich opsiynau i fwrw ymlaen â’ch ${
    isDivorce ? 'cais am ysgariad' : "cais i ddod â'ch partneriaeth sifil i ben"
  }.`,
  returnToHub: 'Dychwelyd i sgrin yr hwb',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
