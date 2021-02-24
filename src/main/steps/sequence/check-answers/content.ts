import { TranslationFn } from '../../../app/controller/GetController';

export const generateContent: TranslationFn = ({ isDivorce, partner, formState }) => {
  const en = {
    title: 'Check your answers',
    aboutPartnership: `About your ${isDivorce ? 'marriage' : 'civil partnership'}`,
    change: 'Change',
    yourDetails: `${isDivorce ? 'Who are you divorcing' : 'Are you male or female'}?`,
    yourDetailsA11y: 'Your details',
    yourDetailsAnswer: `${isDivorce ? `My ${partner}` : formState.gender}`,
    pay: 'Continue to payment',
  };

  // @TODO translations
  const cy: typeof en = { ...en };

  return { en, cy, common: {} };
};
