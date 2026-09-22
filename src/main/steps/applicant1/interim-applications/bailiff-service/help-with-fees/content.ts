import { TranslationFn } from '../../../../../app/controller/GetController.js';
import { FormContent } from '../../../../../app/form/Form.js';
import {
  form as helpWithFeesForm,
  generateContent as helpWithFeesGenerateContent,
} from '../../common/help-with-fees/content.js';

export const form: FormContent = helpWithFeesForm;

export const generateContent: TranslationFn = content => {
  const helpWithFeesContent = helpWithFeesGenerateContent(content);
  return {
    ...helpWithFeesContent,
  };
};
