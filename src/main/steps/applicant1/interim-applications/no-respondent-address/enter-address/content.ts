import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as theirAddressForm,
  generateContent as theirAddressGenerateContent,
} from '../../../enter-their-address/content';

export const form: FormContent = theirAddressForm;

export const generateContent: TranslationFn = content => {
  const theirAddressContent = theirAddressGenerateContent(content);
  return {
    ...theirAddressContent,
  };
};
