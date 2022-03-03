import { TranslationFn } from '../../../app/controller/GetController';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/provide-information-to-the-court/content';

export const form = applicant1Form;

export const generateContent: TranslationFn = content => applicant1GenerateContent(content);
