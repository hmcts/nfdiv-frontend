import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';

const en = ({ partner }) => ({
  title: 'Create a new application',
  newApplicationDisclaimer: `Your ${partner} will not be able to access the new application. They will receive an email confirming this.`,
  create: 'Create a new application',
  cancel: 'Cancel',
});

const cy: typeof en = ({ partner }) => ({
  title: 'Creu cais newydd',
  newApplicationDisclaimer: `Bydd ${partner} yn colli mynediad i'ch cais ar y cyd. Byddant yn cael e-bost yn cadarnhau hyn.`,
  create: 'Creu cais newydd',
  cancel: 'Cancel',
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.create,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
