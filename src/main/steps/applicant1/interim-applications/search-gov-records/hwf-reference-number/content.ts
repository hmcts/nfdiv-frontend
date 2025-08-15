import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as helpWithFeesForm,
  generateContent as helpWithFeesGenerateContent,
} from '../../common/hwf-reference-number/content';

export const form: FormContent = helpWithFeesForm;

export const generateContent: TranslationFn = content => {
  const helpWithFeesContent = helpWithFeesGenerateContent(content);
  return {
    ...helpWithFeesContent,
  };
};
