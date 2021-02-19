import { TranslationFn } from '../../../app/controller/GetController';

export const generateContent: TranslationFn = ({ isDivorce }) => {
  //TODO change when ticket is picked up and implememnted
  const en = {
    title: isDivorce ? 'You have not been married for long enough' : 'You have not been together for long enough',
    line1: 'you need to be married for longer',
  };

  const cy: typeof en = {
    ...en,
  };

  const common = {};

  return { en, cy, common };
};
