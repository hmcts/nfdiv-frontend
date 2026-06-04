import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as internationalAddressForm,
  generateContent as internationalAddressGenerateContent,
} from '../../../address-international/content';

export const form: FormContent = internationalAddressForm;

export const generateContent: TranslationFn = content => {
  const internationalAddressContent = internationalAddressGenerateContent(content);
  return {
    ...internationalAddressContent,
  };
};
