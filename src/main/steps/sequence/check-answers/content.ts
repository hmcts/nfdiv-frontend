import { TranslationFn } from '../../../app/controller/GetController';

export const generateContent: TranslationFn = () => {
  const en = {
    title: 'Check your answers',
    pay: 'Continue to payment',
  };

  // @TODO translations
  const cy: typeof en = { ...en };

  return { en, cy, common: {} };
};
