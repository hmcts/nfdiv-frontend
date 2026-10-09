import { TranslationFn } from '../../../../../app/controller/GetController.js';
import { FormContent } from '../../../../../app/form/Form.js';
import {
  form as hwfReferenceNumberForm,
  generateContent as hwfReferenceNumberGenerateContent,
} from '../../common/hwf-reference-number/content.js';

export const form: FormContent = hwfReferenceNumberForm;

export const generateContent: TranslationFn = content => {
  const hwfReferenceNumberContent = hwfReferenceNumberGenerateContent(content);
  return {
    ...hwfReferenceNumberContent,
  };
};
