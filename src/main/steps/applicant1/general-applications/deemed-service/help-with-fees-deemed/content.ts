import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as helpWithFeesForm,
  generateContent as helpWithFeesGenerateContent,
} from '../../common/help-with-fees/content';

export const form: FormContent = helpWithFeesForm;

export const generateContent: TranslationFn = content => {
  const helpWithFeesContent = helpWithFeesGenerateContent(content);
  return {
    ...helpWithFeesContent,
  };
};
