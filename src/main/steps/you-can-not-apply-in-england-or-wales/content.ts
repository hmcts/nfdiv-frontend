import { TranslationFn } from '../../app/controller/GetController';

const en = ({ isDivorce }) => ({
  title: 'You can’t apply for a divorce in England or Wales',
  line1: `Your answers indicate that the courts of England and Wales do not have jurisdiction to grant you a ${
    isDivorce ? 'divorce' : 'dissolve to your civil partnership'
  }.`,
});

const cy: typeof en = ({ isDivorce }) => ({
  ...en({ isDivorce }),
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
