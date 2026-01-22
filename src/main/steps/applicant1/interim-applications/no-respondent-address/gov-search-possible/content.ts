import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as govSearchPossibleForm,
  generateContent as govSearchPossibleGenerateContent,
} from '../../common/gov-search-possible/content';

export const form: FormContent = govSearchPossibleForm;

export const generateContent: TranslationFn = content => {
  const govSearchPossibleContent = govSearchPossibleGenerateContent(content);
  return {
    ...govSearchPossibleContent,
  };
};
