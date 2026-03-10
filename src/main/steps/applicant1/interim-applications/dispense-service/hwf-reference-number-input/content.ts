import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  applicant1Form as hwfReferenceNumberInputForm,
  generateContent as hwfReferenceNumberInputGenerateContent,
} from '../../common/hwf-reference-number-input/content';

export const form: FormContent = hwfReferenceNumberInputForm;

export const generateContent: TranslationFn = content => {
  const hwfReferenceNumberInputContent = hwfReferenceNumberInputGenerateContent(content);
  return {
    ...hwfReferenceNumberInputContent,
  };
};
