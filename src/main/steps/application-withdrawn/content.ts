import type { TranslationFn } from '../../app/controller/GetController';

const en = () => ({
  title: 'Application Withdrawn',
  line1: 'Your application for divorce has been withdrawn.',
  line2: 'If you want to start a new application, you will be able to use the same email address.',
});

const cy: typeof en = () => ({
  title: 'Application Withdrawn',
  line1: 'Your application for divorce has been withdrawn.',
  line2: 'If you want to start a new application, you will be able to use the same email address.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return { ...languages[content.language](), form: false };
};
