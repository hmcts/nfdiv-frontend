import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  applicant2Form,
  generateContent as applicant1GenerateContent,
} from '../../../../applicant1/interim-applications/general-application/upload-evidence/content';

export const form: FormContent = applicant2Form;
export const generateContent: TranslationFn = applicant1GenerateContent;
