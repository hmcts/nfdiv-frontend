import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  applicant2Form,
  generateContent as applicant1GenerateContent,
} from '../../../../applicant1/interim-applications/general-application/partner-information-correct/content';

export const form: FormContent = applicant2Form;
export const generateContent: TranslationFn = applicant1GenerateContent;
