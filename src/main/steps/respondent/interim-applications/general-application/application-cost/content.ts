import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  form as applicant2Form,
  generateContent as applicant2GenerateContent,
} from '../../../../applicant2/interim-applications/general-application/application-cost/content';

export const form: FormContent = applicant2Form;

export const generateContent: TranslationFn = applicant2GenerateContent;
