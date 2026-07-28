import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { CommonContent } from '../../../../common/common.content';
import {
  generateContent as generateInterruptionContent,
  form as interruptionForm,
} from '../../common/interruption/content';

const en = ({ partner }: CommonContent) => ({
  title: `This application will be shared with your ${partner}`,
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: `This application will be shared with your ${partner}`,
});

const languages = {
  en,
  cy,
};

export const form: FormContent = interruptionForm;

export const generateContent: TranslationFn = content => {
  const interruptionContent = generateInterruptionContent(content);
  const translations = languages[content.language](content);
  return {
    ...interruptionContent,
    ...translations,
    form,
  };
};
