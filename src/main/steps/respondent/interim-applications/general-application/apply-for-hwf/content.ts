import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  generateContent as applicant1GenerateContent,
  form as applicant2Form,
} from '../../../../applicant1/interim-applications/general-application/apply-for-hwf/content';

export const form: FormContent = applicant2Form;
export const generateContent: TranslationFn = applicant1GenerateContent;
