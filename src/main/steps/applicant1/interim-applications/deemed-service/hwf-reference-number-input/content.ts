import { TranslationFn } from '../../../../../app/controller/GetController.js';
import { FormContent } from '../../../../../app/form/Form.js';
import {
  form as hwfReferenceNumberInputForm,
  generateContent as hwfReferenceNumberInputGenerateContent,
} from '../../common/hwf-reference-number-input/content.js';

export const form: FormContent = hwfReferenceNumberInputForm;

export const generateContent: TranslationFn = content => {
  const hwfReferenceNumberInputContent = hwfReferenceNumberInputGenerateContent(content);
  return {
    ...hwfReferenceNumberInputContent,
  };
};
