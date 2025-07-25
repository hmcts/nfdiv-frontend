import type { TranslationFn } from '../../../../app/controller/GetController';

const en = ({ isDivorce }) => ({
  title: 'Service application withdrawn',
  line1: 'Your service application has been withdrawn.',
  line2: `You can return to your hub screen to view your options to proceed with your ${
    isDivorce ? 'divorce' : 'civil partnership'
  } application.`,
  returnToHub: 'Return to hub screen',
});

const cy: typeof en = ({ isDivorce }) => ({
  title: 'Service application withdrawn',
  line1: 'Your service application has been withdrawn.',
  line2: `You can return to your hub screen to view your options to proceed with your ${
    isDivorce ? 'divorce' : 'civil partnership'
  } application.`,
  returnToHub: 'Return to hub screen',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
