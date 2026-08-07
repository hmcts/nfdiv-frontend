import { TranslationFn } from '../../../../../app/controller/GetController.js';
import { FormContent } from '../../../../../app/form/Form.js';
import {
  generateContent as generateInterruptionContent,
  form as interruptionForm,
} from '../../common/interruption/content.js';

const en = () => ({
  title: "You're about to apply for alternative service",
});

const cy = () => ({
  title: 'Rydych ar fin gwneud cais am gyflwyno amgen',
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
