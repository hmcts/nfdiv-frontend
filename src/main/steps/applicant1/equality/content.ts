import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => {
  return {};
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = () => {
  return {
    ...en(),
    form,
  };
};
