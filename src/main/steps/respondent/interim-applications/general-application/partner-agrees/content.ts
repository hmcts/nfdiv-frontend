import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  generateContent as applicant1GenerateContent,
  applicant2Form,
} from '../../../../applicant1/interim-applications/general-application/partner-agrees/content';

export const form: FormContent = applicant2Form;
export const generateContent: TranslationFn = applicant1GenerateContent;
