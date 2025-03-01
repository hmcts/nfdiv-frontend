import { TranslationFn } from '../../../app/controller/GetController';

const en = ({ isDivorce, partner }) => ({
  title: 'You have not confirmed your joint application',
  line1: `You have stated that your ${
    isDivorce ? 'marriage' : 'civil partnership'
  } has not broken down irretrievably. Therefore you cannot make a joint application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  }.`,
  line2: `Your ${partner} has been notified by email.`,
});

const cy: typeof en = ({ isDivorce, partner }) => ({
  title: 'Nid ydych wedi cadarnhau eich cais ar y cyd',
  line1: `Rydych chi wedi dweud nad yw eich ${
    isDivorce ? 'priodas' : 'partneriaeth sifil'
  } wedi chwalu'n anadferadwy. Felly, ni allwch wneud cais ar y cyd ${
    isDivorce ? 'ar gyfer ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
  }.`,
  line2: `Mae eich ${partner} wedi cael ei hysbysu drwy e-bost.`,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
