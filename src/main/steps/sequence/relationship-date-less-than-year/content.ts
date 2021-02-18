import { TranslationFn } from '../../../app/controller/GetController';

export const generateContent = (title: string): TranslationFn => ({ isDivorce }) => {
  //TODO change when ticket is picked up and implemented
  const en = {
    isExitPage: true,
    title: isDivorce ? title : 'You have not been together long enough',
  };

  const cy: typeof en = {
    ...en,
  };

  const common = {};

  return { en, cy, common };
};
