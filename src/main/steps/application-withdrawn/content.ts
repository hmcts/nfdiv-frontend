import type { TranslationFn } from '../../app/controller/GetController';

const en = ({ isDivorce }) => ({
  title: 'Application Withdrawn',
  line1: `Your application ${isDivorce ? 'for divorce' : 'to end your civil partnership'} has been withdrawn.`,
  line2: 'If you want to start a new application, you will be able to use the same email address.',
});

const cy: typeof en = ({ isDivorce }) => ({
  title: "Mae’r cais wedi'i dynnu'n ôl",
  line1: `Mae eich cais ${isDivorce ? 'am ysgariad' : "i ddod â'ch partneriaeth sifil i ben"} wedi'i dynnu'n ôl.`,
  line2: "Os ydych chi eisiau dechrau cais newydd, byddwch chi'n gallu defnyddio'r un cyfeiriad e-bost.",
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
