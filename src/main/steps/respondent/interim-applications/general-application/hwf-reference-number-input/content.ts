import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import {
  generateContent as applicant1GenerateContent,
} from '../../../../applicant1/interim-applications/general-application/hwf-reference-number-input/content';
import { applicant2Form } from '../../../../applicant1/interim-applications/common/hwf-reference-number-input/content';

export const form: FormContent = applicant2Form;
export const generateContent: TranslationFn = applicant1GenerateContent;