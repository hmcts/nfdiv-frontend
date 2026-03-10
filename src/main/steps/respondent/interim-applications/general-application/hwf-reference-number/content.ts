import { TranslationFn } from '../../../../../app/controller/GetController';
import {
  generateContent as applicant1GenerateContent,
} from '../../../../applicant1/interim-applications/general-application/hwf-reference-number/content';
import { FormContent } from '../../../../../app/form/Form';
import { applicant2Form } from '../../../../applicant1/interim-applications/common/hwf-reference-number/content';

export const form: FormContent = applicant2Form;

export const generateContent: TranslationFn = applicant1GenerateContent;