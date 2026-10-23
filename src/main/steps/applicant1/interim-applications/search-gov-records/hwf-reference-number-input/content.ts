import { TranslationFn } from '../../../../../app/controller/GetController.js';
import { FormContent } from '../../../../../app/form/Form.js';
import {
  form as helpWithFeesForm,
  generateContent as helpWithFeesGenerateContent,
} from '../../common/hwf-reference-number-input/content.js';

export const form: FormContent = helpWithFeesForm;

export const generateContent: TranslationFn = content => {
  const helpWithFeesContent = helpWithFeesGenerateContent(content);
  return {
    ...helpWithFeesContent,
  };
};
