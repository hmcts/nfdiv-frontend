import { TranslationFn } from '../../../app/controller/GetController';

const en = ({ isDivorce, partner, civilPartner }) => ({
  title: 'You have not confirmed your joint application',
  line1: `You have stated that your ${
    isDivorce ? 'marriage' : 'civil partnership'
  } has not irretrievably broken down. Therefore you cannot make a joint application for divorce.`,
  line2: `Your ${partner} has been notified by email.`,
});

const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
