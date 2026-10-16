import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as hwfReferenceNumberForm,
  generateContent as hwfReferenceNumberGenerateContent,
} from '../../common/hwf-reference-number/content';

const en = () => ({
  line2: 'You will have received this number when you applied for help with fees for this application.',
});

const cy = () => ({
  line2: 'You will have received this number when you applied for help with fees for this application.',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = hwfReferenceNumberForm;

export const generateContent: TranslationFn = content => {
  const hwfReferenceNumberContent = hwfReferenceNumberGenerateContent(content);
  const translations = languages[content.language]();
  return {
    ...hwfReferenceNumberContent,
    ...translations,
    form,
  };
};
