import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { habitualAndDomicileHelp } from '../you-can-use-english-welsh-courts/content';

const en = ({ partner, apply }) => ({
  title: `You can use English or Welsh courts to ${apply}`,
  line1: `Your answers indicate that you can ${apply} in England and Wales because:`,
  line2: `both you and your ${partner} are habitually resident`,
  ...habitualAndDomicileHelp.en,
});

const cy = en;

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = { en, cy };

export const generateContent: TranslationFn = content => {
  const apply = content.isDivorce ? content.applyForDivorce : content.applyForDissolution;
  const translations = languages[content.language]({ ...content, apply });
  return {
    ...translations,
    form,
  };
};
