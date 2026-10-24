import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../../../applicant1/interim-applications/withdraw-post-issue/withdraw-application/content';

export const form: FormContent = applicant1Form;
export const generateContent: TranslationFn = applicant1GenerateContent;
