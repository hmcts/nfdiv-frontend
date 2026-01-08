import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = ({ isDivorce, partner }) => ({
  title: `${isDivorce ? 'Divorcing' : 'Ending a civil partnership with'} someone who lives outside of England and Wales`,
  line1:
    'The address you have provided is outside of England and Wales. That means you are responsible for serving the papers.',
  line2: `You will receive the documents that you need to send to your ${partner}.`,
});

//TODO Welsh translation required
const cy: typeof en = ({ isDivorce, partner }) => ({
  title: `${isDivorce ? 'Divorcing' : 'Ending civil partnership with'} someone who lives outside of England and Wales`,
  line1:
    'The address you have provided is outside of England and Wales. That means you are responsbile for serving the papers.',
  line2: `You will recieve the documents that you need to send to your ${partner}.`,
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
