import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import {
  form as withdrawThisApplicationForm,
  generateContent as withdrawThisApplicationGenerateContent,
} from '../../../applicant1/withdraw-pre-issue/withdraw-this-application/content';

export const form: FormContent = withdrawThisApplicationForm;

export const generateContent: TranslationFn = content => {
  const withdrawApplicationContent = withdrawThisApplicationGenerateContent(content);
  return {
    ...withdrawApplicationContent,
  };
};
