import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as d11StartForm,
  generateContent as d11StartPageContent,
} from '../../../../applicant1/interim-applications/general-application/make-an-application/content';

export const form: FormContent = d11StartForm;

export const generateContent: TranslationFn = content => {
  const pageContent = d11StartPageContent(content);
  return {
    ...pageContent,
  };
};
