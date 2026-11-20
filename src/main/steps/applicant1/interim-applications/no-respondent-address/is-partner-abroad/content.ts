import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as isPartnerAbroadForm,
  generateContent as isPartnerAbroadGenerateContent,
} from '../../common/is-partner-abroad/content';

export const form: FormContent = isPartnerAbroadForm;

export const generateContent: TranslationFn = content => {
  const isPartnerAbroadContent = isPartnerAbroadGenerateContent(content);
  return {
    ...isPartnerAbroadContent,
  };
};
