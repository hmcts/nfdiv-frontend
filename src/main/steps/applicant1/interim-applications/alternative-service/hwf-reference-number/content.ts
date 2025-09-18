import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as hwfReferenceNumberForm,
  generateContent as hwfReferenceNumberGenerateContent,
} from '../../common/hwf-reference-number/content';

export const form: FormContent = hwfReferenceNumberForm;

export const generateContent: TranslationFn = content => {
  const hwfReferenceNumberContent = hwfReferenceNumberGenerateContent(content);
  return {
    ...hwfReferenceNumberContent,
  };
};
