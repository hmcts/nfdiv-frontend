import { TranslationFn } from '../../../app/controller/GetController';

export const generateContent = (title: string): TranslationFn => ({ isDivorce }) => {
  //TODO change when ticket is picked up and implememnted
  const en = {
    title: isDivorce ? title : 'You have not been together for long enough',
    line1: 'you need to be married for longer',
  };

  const cy: typeof en = {
    ...en,
  };

  const common = {};

  return { en, cy, common };
};
