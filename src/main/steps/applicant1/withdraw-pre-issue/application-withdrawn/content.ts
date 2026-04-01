import { TranslationFn } from '../../../../app/controller/GetController';

const en = ({ isDivorce }) => ({
  title: 'Application Withdrawn',
  line1: `You have successfully withdrawn your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }.`,
  whatHappensNext: 'What happens next',
  whatHappensNextLine1:
    'We will refund the application fee within the next 30 days if the court confirms that you are due a refund.',
});

const cy: typeof en = ({ isDivorce }) => ({
  title: 'Cais wedi’i dynnu’n ôl',
  line1: `Rydych wedi tynnu eich ${
    isDivorce ? 'cais am ysgariad' : 'cais i ddod â’ch partneriaeth sifil i ben'
  } yn ôl yn llwyddiannus.`,
  whatHappensNext: 'Beth fydd yn digwydd nesaf',
  whatHappensNextLine1:
    'Byddwn yn ad-dalu ffi’r cais o fewn y 30 diwrnod nesaf os bydd y llys yn cadarnhau bod ad-daliad yn ddyledus i chi.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
