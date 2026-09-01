import { TranslationFn } from '../../../app/controller/GetController.js';
import { FormContent } from '../../../app/form/Form.js';
import {
  form as applicant2Form,
  generateContent as applicant2GenerateContent,
} from '../../applicant2/enter-your-address/content.js';

export const form: FormContent = applicant2Form;

export const generateContent: TranslationFn = applicant2GenerateContent;
