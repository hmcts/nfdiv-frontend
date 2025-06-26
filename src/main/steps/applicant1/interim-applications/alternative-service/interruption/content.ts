import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  generateContent as generateInterruptionContent,
  form as interruptionForm,
} from '../../common/interruption/content';

const en = () => ({
  title: "You're about to apply for alternative service",
});

// @TODO translations
const cy = () => ({
  title: "You're about to apply for alternative service",
});

const languages = {
  en,
  cy,
};

export const form: FormContent = interruptionForm;

export const generateContent: TranslationFn = content => {
  const interruptionContent = generateInterruptionContent(content);
  const translations = languages[content.language]();
  return {
    ...interruptionContent,
    ...translations,
    form,
  };
};
